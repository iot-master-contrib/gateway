package gateway

import (
	"embed"
	"github.com/iot-master-contrib/gateway/api"
	_ "github.com/iot-master-contrib/gateway/docs"
	"github.com/iot-master-contrib/gateway/internal"
	_ "github.com/iot-master-contrib/gateway/modbus" //默认引入modbus协议
	"github.com/zgwit/iot-master/v4/pkg/log"
	"github.com/zgwit/iot-master/v4/plugin"
	"github.com/zgwit/iot-master/v4/web"
	"gopkg.in/yaml.v3"
	"net/http"
	"strings"
)

//go:embed all:www
var wwwFiles embed.FS

//go:embed manifest.yaml
var _manifest string
var manifest plugin.Manifest

func Manifest() *plugin.Manifest {
	return &manifest
}

func init() {
	//前端静态文件
	web.Static.Put("/$gateway", http.FS(wwwFiles), "www", "index.html")

	d := yaml.NewDecoder(strings.NewReader(_manifest))
	err := d.Decode(&manifest)
	if err != nil {
		log.Fatal(err)
	}

	manifest.Startup = Startup
	manifest.Shutdown = Shutdown
}

// @title 物联大师网关接口文档
// @version 1.0 版本
// @description API文档
// @BasePath /$gateway/api/
// @query.collection.format multi
func main() {
}

func Startup() error {

	//内部加载
	//err := internal.LoadProducts()
	//if err != nil {
	//	log.Fatal(err)
	//}

	//连接
	err := internal.Load()
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
