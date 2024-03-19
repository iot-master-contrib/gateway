package api

import (
	"github.com/gin-gonic/gin"
	"github.com/iot-master-contrib/gateway/types"
	"github.com/zgwit/iot-master/v4/web/curd"
)

// @Summary 查询设备
// @Schemes
// @Description 查询设备
// @Tags device
// @Param search body curd.ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyList[types.Device] 返回设备信息
// @Router /device/search [post]
func noopDeviceSearch() {}

// @Summary 获取设备
// @Schemes
// @Description 获取设备
// @Tags device
// @Param id path int true "设备ID"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[types.Device] 返回设备信息
// @Router /device/{id} [get]
func noopDeviceGet() {}

// @Summary 修改设备
// @Schemes
// @Description 修改设备
// @Tags device
// @Param id path int true "设备ID"
// @Param device body types.Device true "设备信息"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[types.Device] 返回设备信息
// @Router /device/{id} [post]
func noopDeviceUpdate() {}

func deviceRouter(app *gin.RouterGroup) {

	app.POST("/search", curd.ApiSearchWith[types.Device]([]*curd.Join{
		{"server", "server_id", "id", "name", "server"},
	}))

	app.GET("/:id", curd.ParseParamStringId, curd.ApiGet[types.Device]())

	app.POST("/:id", curd.ParseParamStringId, curd.ApiUpdateHook[types.Device](nil, func(value *types.Device) error {
		//TODO 重新加载设备

		return nil
	}, "tunnel_id", "modbus_station"))

}
