package main

import (
	"github.com/iot-master-contrib/gateway"
	"github.com/zgwit/iot-master/v4/web"
	"log"
)

func main() {
	web.Start()

	plugin := gateway.Manifest()
	err := plugin.Startup()
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
