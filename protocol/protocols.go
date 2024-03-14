package protocol

import (
	"fmt"
	"github.com/iot-master-contrib/gateway/connect"
	"github.com/iot-master-contrib/gateway/types"
)

var protocols = map[string]*Protocol{}

func Protocols() []*Protocol {
	var ps []*Protocol
	for _, p := range protocols {
		ps = append(ps, p)
	}
	return ps
}

func Register(proto *Protocol) {
	protocols[proto.Name] = proto
}

func Create(tunnel string, conn connect.Conn, name string, opts types.Options) (Adapter, error) {
	if p, ok := protocols[name]; ok {
		return p.Factory(tunnel, conn, opts)
	}
	return nil, fmt.Errorf("协议 %s 找不到", name)
}
