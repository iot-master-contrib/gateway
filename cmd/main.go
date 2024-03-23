package main

import (
	"github.com/iot-master-contrib/gateway"
	"github.com/iot-master-contrib/influxdb"
	_ "github.com/iot-master-contrib/webui"
	master "github.com/zgwit/iot-master/v4"
	"github.com/zgwit/iot-master/v4/pkg/log"
	"github.com/zgwit/iot-master/v4/web"
)

func main() {
	err := master.Startup()
	if err != nil {
		log.Fatal(err)
	}

	err = influxdb.Open()
	if err != nil {
		log.Fatal(err)
	}

	plugin := gateway.Manifest()
	err = plugin.Startup()
	if err != nil {
		log.Fatal(err)
	}

	err = web.Serve()
	if err != nil {
		log.Fatal(err)
	}

	err = plugin.Shutdown()
	if err != nil {
		log.Fatal(err)
	}

}
