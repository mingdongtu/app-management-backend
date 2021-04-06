let Router = require('koa-router');
const homeRouter = new Router()
const infoController = require('./../controllers/index')
const routers = homeRouter.post('/login',infoController.getLogin)
                          .get("/appList",infoController.getAppList)
                          .get("/appDetail",infoController.getAppDetail)
                          .post("/upload",infoController.handleUpload)

module.exports = routers;