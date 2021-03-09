let Router = require('koa-router');
const homeRouter = new Router()
const infoController = require('./../controllers/index')
const routers = homeRouter.post('/login/web',infoController.getLogin)
module.exports = routers;
