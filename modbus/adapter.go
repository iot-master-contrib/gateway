package modbus

import (
	"errors"
	"fmt"
	"github.com/iot-master-contrib/gateway/types"
	"github.com/zgwit/iot-master/v4/pkg/db"
	"github.com/zgwit/iot-master/v4/pkg/log"
	"github.com/zgwit/iot-master/v4/pkg/mqtt"
	"go.bug.st/serial"
	"io"
	"net"
	"time"
)

type Adapter struct {
	modbus  Modbus
	devices []*types.Device
}

func (adapter *Adapter) start(tunnel string, opts types.Options) error {
	err := db.Engine.Where("tunnel_id=?", tunnel).And("disabled!=1").
		Cols("id", "product_id", "modbus_station").Find(&adapter.devices)

	if err != nil {
		return err
	}

	if len(adapter.devices) == 0 {
		return errors.New("无设备")
	}

	//开始轮询
	go func() {

		//设备上线
		//!!! 不能这样做，不然启动服务器会产生大量的消息
		//for _, dev := range adapter.devices {
		//	topic := fmt.Sprintf("device/online/%s", dev.Id)
		//	_ = mqtt.Publish(topic, nil)
		//}

	OUT:
		for {
			start := time.Now().Unix()
			for _, dev := range adapter.devices {
				values, err := adapter.Sync(dev)
				if err != nil {
					log.Error(err)

					//连接断开错误
					if err == io.EOF {
						break OUT
					}

					//网络错误（读超时除外）
					var ne net.Error
					if errors.As(err, &ne) && !ne.Timeout() {
						break OUT
					}

					//串口错误（读超时除外）
					var se *serial.PortError
					if errors.As(err, &se) && (se.Code() != serial.InvalidTimeoutValue) {
						break OUT
					}
				}

				//_ = pool.Insert(func() {
				topic := fmt.Sprintf("device/%s/property", dev.Id)
				mqtt.Publish(topic, values)
			}

			now := time.Now().Unix()
			interval := opts.Int64("poller_interval", 300) //默认5分钟轮询一次
			if now-start < interval {
				time.Sleep(time.Second * time.Duration(interval-(now-start)))
			}

			//避免空转，睡眠1分钟（可能有点长）
			if now-start < 1 {
				time.Sleep(time.Minute)
			}
		}

		//设备下线
		for _, dev := range adapter.devices {
			topic := fmt.Sprintf("device/%s/offline", dev.Id)
			_ = mqtt.Publish(topic, nil)
		}
	}()
	return nil
}

func (adapter *Adapter) Get(device *types.Device, name string) (any, error) {
	prod, err := GetProduct(device.ProductId)
	if err != nil {
		return nil, err
	}

	mapper, _ := lookup(prod.Mappers, name)
	if mapper == nil {
		return nil, errors.New("找不到数据点")
	}

	//此处全部读取了，有些冗余
	data, err := adapter.modbus.Read(device.ModbusStation, mapper.Code, mapper.Address, mapper.Size)
	if err != nil {
		return nil, err
	}

	values := make(map[string]any)
	mapper.Parse(data, values)
	return values[name], nil
}

func (adapter *Adapter) Set(device *types.Device, name string, value any) error {
	prod, err := GetProduct(device.ProductId)
	if err != nil {
		return err
	}

	mapper, point := lookup(prod.Mappers, name)
	if mapper == nil {
		return errors.New("地址找不到")
	}
	_, data, err := mapper.Encode(name, value)
	if err != nil {
		return err
	}
	return adapter.modbus.Write(device.ModbusStation, mapper.Code, mapper.Address+uint16(point.Offset), data)
}

func (adapter *Adapter) Sync(device *types.Device) (map[string]any, error) {
	values := make(map[string]any)

	prod, err := GetProduct(device.ProductId)
	if err != nil {
		return nil, err
	}

	for _, mapper := range prod.Mappers {
		data, err := adapter.modbus.Read(device.ModbusStation, mapper.Code, mapper.Address, mapper.Size)
		if err != nil {
			return nil, err
		}
		mapper.Parse(data, values)
	}

	//TODO 计算器

	return values, nil
}
