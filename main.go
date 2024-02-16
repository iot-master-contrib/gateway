package gateway

import (
	"embed"
	"github.com/iot-master-contrib/gateway/api"
	_ "github.com/iot-master-contrib/gateway/docs"
	"github.com/iot-master-contrib/gateway/internal"
	"github.com/iot-master-contrib/gateway/types"
	"github.com/zgwit/iot-master/v4/pkg/db"
	"github.com/zgwit/iot-master/v4/pkg/log"
	"github.com/zgwit/iot-master/v4/web"
	"net/http"
)

//go:embed all:www
var wwwFiles embed.FS

func init() {
	//前端静态文件
	web.Static.Put("/$gateway", http.FS(wwwFiles), "www", "www/index.html")
}

// @title 物联大师网关接口文档
// @version 1.0 版本
// @description API文档
// @BasePath /$gateway/api/
// @query.collection.format multi
func main() {
}

func Startup() error {

	//同步表结构
	err := db.Engine.Sync2(
		new(types.Client), new(types.Server),
		new(types.Link), new(types.Serial),
	)
	if err != nil {
		log.Fatal(err)
	}

	//内部加载
	err = internal.LoadProducts()
	if err != nil {
		log.Fatal(err)
	}

	//连接
	err = internal.Load()
	if err != nil {
		log.Fatal(err)
	}
	//defer connect.Close()

	group := web.Engine.Group("/$gateway")

	//注册前端接口
	api.RegisterRoutes(group.Group("/api"))

	//注册接口文档
	web.RegisterSwaggerDocs(group, "gateway")

	return nil
}

func Shutdown() error {

	//只关闭Web就行了，其他通过defer关闭

	return nil
}
