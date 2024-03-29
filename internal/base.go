package internal

import (
	"errors"
	"github.com/iot-master-contrib/gateway/connect"
	"github.com/iot-master-contrib/gateway/protocol"
	"github.com/iot-master-contrib/gateway/types"
	"io"
	"sync"
	"time"
)

type tunnelBase struct {
	connect.Conn

	adapter protocol.Adapter

	lock sync.Mutex

	running bool
	online  bool
	closed  bool

	retry      uint
	retryTimer *time.Timer

	//透传
	pipe io.ReadWriteCloser
}

func (l *tunnelBase) Running() bool {
	return l.running
}

func (l *tunnelBase) Online() bool {
	return l.online
}

// Close 关闭
func (l *tunnelBase) Close() error {
	if l.retryTimer != nil {
		l.retryTimer.Stop()
	}
	if !l.running {
		return errors.New("Tunnel closed")
	}

	l.closed = true

	l.onClose()
	return l.Conn.Close()
}

func (l *tunnelBase) onClose() {
	l.running = false
	if l.pipe != nil {
		_ = l.pipe.Close()
	}
}

// Write 写
func (l *tunnelBase) Write(data []byte) (int, error) {
	if !l.running {
		return 0, errors.New("model closed")
	}
	if l.pipe != nil {
		return 0, nil //透传模式下，直接抛弃
	}
	return l.Conn.Write(data)
}

// Read 读
func (l *tunnelBase) Read(data []byte) (int, error) {
	if !l.running {
		return 0, errors.New("model closed")
	}

	if l.pipe != nil {
		//TODO 先read，然后透传
		return 0, nil //透传模式下，直接抛弃
	}
	return l.Conn.Read(data)
}

func (l *tunnelBase) start(model *types.Tunnel) (err error) {
	l.adapter, err = protocol.Create(model.Id, l.Conn, model.ProtocolName, model.ProtocolOptions.ProtocolOptions)
	return
}

func (l *tunnelBase) Pipe(pipe io.ReadWriteCloser) {
	//关闭之前的透传
	if l.pipe != nil {
		_ = l.pipe.Close()
	}

	l.pipe = pipe
	//传入空，则关闭
	if pipe == nil {
		return
	}

	buf := make([]byte, 1024)
	for {
		n, err := pipe.Read(buf)
		if err != nil {
			//if err == io.EOF {
			//	continue
			//}
			//pipe关闭，则不再透传
			break
		}
		//将收到的数据转发出去
		n, err = l.Conn.Write(buf[:n])
		if err != nil {
			//发送失败，说明连接失效
			_ = pipe.Close()
			break
		}
	}
	l.pipe = nil

	//TODO 使用io.copy
	//go io.Copy(pipe, l.conn)
	//go io.Copy(l.conn, pipe)
}
