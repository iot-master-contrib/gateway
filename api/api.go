package api

import "github.com/gin-gonic/gin"

func RegisterRoutes(app *gin.RouterGroup) {

	serialRouter(app.Group("/serial"))

	clientRouter(app.Group("/client"))

	serverRouter(app.Group("/server"))

	linkRouter(app.Group("/link"))

	deviceRouter(app.Group("/device"))
}
