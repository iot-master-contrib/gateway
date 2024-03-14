package protocol

import (
	"github.com/iot-master-contrib/gateway/connect"
	"github.com/iot-master-contrib/gateway/types"
)

type Factory func(tunnel string, conn connect.Conn, opts types.Options) (Adapter, error)

type Protocol struct {
	Name    string
	Label   string
	Factory Factory
}

type Adapter interface {
	Get(device *types.Device, name string) (any, error)
	Set(device *types.Device, name string, value any) error
	Sync(device *types.Device) (map[string]any, error)
}
