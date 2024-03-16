package main

import (
	"github.com/iot-master-contrib/gateway"
	"github.com/zgwit/iot-master/v4/pkg/config"
	"github.com/zgwit/iot-master/v4/pkg/db"
	"github.com/zgwit/iot-master/v4/pkg/log"
	"github.com/zgwit/iot-master/v4/pkg/mqtt"
	"github.com/zgwit/iot-master/v4/pkg/pool"
	"github.com/zgwit/iot-master/v4/web"
)

func main() {

	//加载配置文件
	err := config.Load()
	if err != nil {
		log.Error(err)
		_ = config.Store()
	}

	err = log.Open()
	if err != nil {
		log.Fatal(err)
	}

	//加载数据库
	err = db.Open()
	if err != nil {
		log.Fatal(err)
	}

	//MQTT连接
	token := mqtt.Open()
	token.Wait()
	if token.Error() != nil {
		log.Fatal(token.Error())
	}

	//线程池
	err = pool.Open()
	if err != nil {
		log.Fatal(err)
	}

	web.Start()

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
