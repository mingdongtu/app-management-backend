let Router = require('koa-router');
const homeRouter = new Router()
const infoController = require('./../controllers/index')
const routers = homeRouter.get('/login',infoController.getLogin)
console.log('进入API')
module.exports = routers;
