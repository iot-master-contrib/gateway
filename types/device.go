package types

import (
	"github.com/zgwit/iot-master/v4/types"
)

type Device struct {
	types.Device `xorm:"extends"`

	TunnelId string `json:"tunnel_id,omitempty" xorm:"index"` //通道
	Tunnel   string `json:"tunnel,omitempty" xorm:"<-"`

	ModbusStation uint8 `json:"modbus_station,omitempty"`

	Online bool `json:"online" xorm:"-"`
}
