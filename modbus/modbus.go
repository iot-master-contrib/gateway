package modbus

import (
	"github.com/iot-master-contrib/gateway/connect"
	"github.com/iot-master-contrib/gateway/protocol"
	"github.com/iot-master-contrib/gateway/types"
)

//var code = []types.Code{
//	{Code: 1, Label: "线圈"},
//	{Code: 2, Label: "离散输入"},
//	{Code: 3, Label: "保持寄存器"},
//	{Code: 4, Label: "输入寄存器"},
//}

var modbusRtu = &protocol.Protocol{
	Name:  "modbus-rtu",
	Label: "Modbus RTU",
	Factory: func(tunnel string, conn connect.Conn, opts types.Options) (protocol.Adapter, error) {
		adapter := &Adapter{
			modbus: NewRTU(conn, opts),
		}
		err := adapter.start(tunnel, opts)
		if err != nil {
			return nil, err
		}
		return adapter, nil
	},
}

var modbusTCP = &protocol.Protocol{
	Name:  "modbus-tcp",
	Label: "Modbus TCP",
	Factory: func(tunnel string, conn connect.Conn, opts types.Options) (protocol.Adapter, error) {
		adapter := &Adapter{
			modbus: NewTCP(conn, opts),
		}
		err := adapter.start(tunnel, opts)
		if err != nil {
			return nil, err
		}
		return adapter, nil
	},
}

type Modbus interface {
	Read(station, code uint8, addr, size uint16) ([]byte, error)
	Write(station, code uint8, addr uint16, buf []byte) error
}

func init() {
	protocol.Register(modbusRtu)
	protocol.Register(modbusTCP)
}
