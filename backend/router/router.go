package router

import (
	"AnimeCat/controllers"
	"AnimeCat/middlewares"
	"log"

	"github.com/gin-gonic/gin"
)

func InitRouter() {
	r := gin.Default()
	r.POST("/api/account", controllers.LoginHandler)
	r.GET("/api/wallpaper", controllers.GetWallPaperHandler)
	r.GET("/api/logo", controllers.GetLogoHandler)
	api := r.Group("/api", middlewares.JWTAuthMiddleware())
	{
		api.GET("/setting", controllers.GetSettingHandler)
		api.PUT("/setting", controllers.PutSettingHandler)
		api.GET("/AnimeCat/*path", controllers.AnimeCatHandler)
		api.POST("/AnimeCat/dir", controllers.PostAnimeCatDir)
		api.GET("/AnimeCatID", controllers.AnimeCatIDHandler)
		api.DELETE("/AnimeCatID", controllers.AnimeCatDeleteHandler)
		// api.POST("/AnimeCat/obj", controllers.PostAnimeCatObj)
	}
	err := r.Run(":80")
	if err != nil {
		log.Fatalf("InitRouter failed, the err is %s", err)
	}
}
