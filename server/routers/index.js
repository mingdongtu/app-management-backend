//路由目录
const Router = require('koa-router');
const homeRouter = new Router();
const api = require('./api')
//.use（）第一个参数会默认添加在以后的请求方法（get/post）的url之前，这个要注意
//这里是做路由分发
homeRouter.use('/apm',api.routes(),api.allowedMethods())

module.exports = homeRouter;