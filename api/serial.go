package api

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/iot-master-contrib/gateway/internal"
	"github.com/iot-master-contrib/gateway/types"
	"github.com/zgwit/iot-master/v4/pkg/db"
	"github.com/zgwit/iot-master/v4/pkg/log"
	"github.com/zgwit/iot-master/v4/web/curd"
	"github.com/zgwit/iot-master/v4/web/export"
	"go.bug.st/serial"
)

// @Summary 查询串口数量
// @Schemes
// @Description 查询串口数量
// @Tags serial
// @Param search body curd.ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[int64] 返回串口数量
// @Router /serial/count [post]
func noopSerialCount() {}

// @Summary 查询串口
// @Schemes
// @Description 查询串口
// @Tags serial
// @Param search body curd.ParamSearch true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyList[types.Serial] 返回串口信息
// @Router /serial/search [post]
func noopSerialSearch() {}

// @Summary 查询串口
// @Schemes
// @Description 查询串口
// @Tags serial
// @Param search query curd.ParamList true "查询参数"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyList[types.Serial] 返回串口信息
// @Router /serial/list [get]
func noopSerialList() {}

// @Summary 创建串口
// @Schemes
// @Description 创建串口
// @Tags serial
// @Param search body types.Serial true "串口信息"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[types.Serial] 返回串口信息
// @Router /serial/create [post]
func noopSerialCreate() {}

// @Summary 修改串口
// @Schemes
// @Description 修改串口
// @Tags serial
// @Param id path int true "串口ID"
// @Param serial body types.Serial true "串口信息"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[types.Serial] 返回串口信息
// @Router /serial/{id} [post]
func noopSerialUpdate() {}

// @Summary 获取串口
// @Schemes
// @Description 获取串口
// @Tags serial
// @Param id path int true "串口ID"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[types.Serial] 返回串口信息
// @Router /serial/{id} [get]
func noopSerialGet() {}

// @Summary 删除串口
// @Schemes
// @Description 删除串口
// @Tags serial
// @Param id path int true "串口ID"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[types.Serial] 返回串口信息
// @Router /serial/{id}/delete [get]
func noopSerialDelete() {}

// @Summary 启用串口
// @Schemes
// @Description 启用串口
// @Tags serial
// @Param id path int true "串口ID"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[types.Serial] 返回串口信息
// @Router /serial/{id}/enable [get]
func noopSerialEnable() {}

// @Summary 禁用串口
// @Schemes
// @Description 禁用串口
// @Tags serial
// @Param id path int true "串口ID"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[types.Serial] 返回串口信息
// @Router /serial/{id}/disable [get]
func noopSerialDisable() {}

// @Summary 启动串口
// @Schemes
// @Description 启动串口
// @Tags serial
// @Param id path int true "串口ID"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[types.Serial] 返回串口信息
// @Router /serial/{id}/start [get]
func noopSerialStart() {}

// @Summary 停止串口
// @Schemes
// @Description 停止串口
// @Tags serial
// @Param id path int true "串口ID"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[types.Serial] 返回串口信息
// @Router /serial/{id}/stop [get]
func noopSerialStop() {}

// @Summary 导出串口
// @Schemes
// @Description 导出串口
// @Tags product
// @Accept json
// @Produce octet-stream
// @Router /serial/export [get]
func noopSerialExport() {}

// @Summary 导入串口
// @Schemes
// @Description 导入串口
// @Tags product
// @Param file formData file true "压缩包"
// @Accept mpfd
// @Produce json
// @Success 200 {object} curd.ReplyData[int64] 返回串口数量
// @Router /serial/import [post]
func noopSerialImport() {}

// @Summary 串口列表
// @Schemes
// @Description 串口列表
// @Tags serial
// @Produce json
// @Success 200 {object} curd.ReplyData[string] 返回串口列表
// @Router /serial/ports [get]
func noopSerialPorts() {}

func serialRouter(app *gin.RouterGroup) {

	app.POST("/count", curd.ApiCount[types.Serial]())

	app.POST("/search", curd.ApiSearchHook[types.Serial](func(serials []*types.Serial) error {
		for k, ser := range serials {
			c := internal.GetSerial(ser.Id)
			if c != nil {
				serials[k].Running = c.Running()
			}
		}
		return nil
	}))

	app.GET("/list", curd.ApiList[types.Serial]())

	app.POST("/create", curd.ApiCreateHook[types.Serial](curd.GenerateID[types.Serial](), func(value *types.Serial) error {
		return internal.LoadSerial(value)
	}))

	app.GET("/:id", curd.ParseParamStringId, curd.ApiGetHook[types.Serial](func(ser *types.Serial) error {
		c := internal.GetSerial(ser.Id)
		if c != nil {
			ser.Running = c.Running()
		}
		return nil
	}))

	app.POST("/:id", curd.ParseParamStringId, curd.ApiUpdateHook[types.Serial](nil, func(value *types.Serial) error {
		c := internal.GetSerial(value.Id)
		err := c.Close()
		if err != nil {
			log.Error(err)
		}
		return internal.LoadSerial(value)
	},
		"id", "name", "description", "heartbeat", "poller_period", "poller_interval", "protocol_name", "protocol_options",
		"port_name", "baud_rate", "data_bits", "stop_bits", "parity_mode", "retry_timeout", "retry_maximum", "disabled"))

	app.GET("/:id/delete", curd.ParseParamStringId, curd.ApiDeleteHook[types.Serial](nil, func(value interface{}) error {
		id := value.(string)
		c := internal.GetSerial(id)
		return c.Close()
	}))

	app.GET(":id/disable", curd.ParseParamStringId, curd.ApiDisableHook[types.Serial](true, nil, func(value interface{}) error {
		id := value.(string)
		c := internal.GetSerial(id)
		return c.Close()
	}))

	app.GET(":id/enable", curd.ParseParamStringId, curd.ApiDisableHook[types.Serial](false, nil, func(value interface{}) error {
		id := value.(string)
		var m types.Serial
		has, err := db.Engine.ID(id).Get(&m)
		if err != nil {
			return err
		}
		if !has {
			return fmt.Errorf("找不到 %s", id)
		}
		return internal.LoadSerial(&m)
	}))

	app.GET(":id/start", curd.ParseParamStringId, func(ctx *gin.Context) {
		id := ctx.GetString("id")
		c := internal.GetSerial(id)
		if c == nil {
			curd.Fail(ctx, "找不到连接")
			return
		}
		err := c.Open()
		if err != nil {
			curd.Error(ctx, err)
			return
		}
		curd.OK(ctx, nil)
	})

	app.GET(":id/stop", curd.ParseParamStringId, func(ctx *gin.Context) {
		id := ctx.GetString("id")
		c := internal.GetSerial(id)
		if c == nil {
			curd.Fail(ctx, "找不到连接")
			return
		}
		err := c.Close()
		if err != nil {
			curd.Error(ctx, err)
			return
		}
		curd.OK(ctx, nil)
	})

	app.GET("/export", export.ApiExport("serial", "serial"))
	app.POST("/import", export.ApiImport("serial"))

	app.GET("ports", func(ctx *gin.Context) {
		list, err := serial.GetPortsList()
		if err != nil {
			curd.Error(ctx, err)
			return
		}
		curd.OK(ctx, list)
	})

}
