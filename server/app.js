//服务入口文件

const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const config = require('../config')
const routers = require('./routers/index')
const cors = require('koa2-cors');
// app.use(async (ctx)=>{
//      ctx.body = "欢迎来到搜电App包管理平台"
// })
// 具体参数我们在后面进行解释
// app.use(cors({  //后端设置跨域
//     origin: function (ctx) {
//       console.log(`前端过来的请求地址${ctx.url}`)
      
//         // if (ctx.url === '/') {
//         //     return "*"; // 允许来自所有域名请求
//         // }
//         // console.log(`看下请求地址${ctx.url}`)
//         return 'http://localhost:9526'; //这样就能只允许 http://localhost:8080 这个域名的请求了
//     },
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//     maxAge: 5,
//     credentials: true,
//     allowMethods: ['GET', 'POST', 'DELETE'],
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))
//初始化路由中间件
// const webpack = require('webpack')
// const webpackDevMiddleware = require('koa-webpack-dev-middleware')
// const webpackHotMiddleware = require('koa-webpack-hot-middleware')
// const webpackConfig = require('./webpack.config')
// const compiler = webpack(webpackConfig)

// const wdm = webpackDevMiddleware(compiler, {
//   noInfo: true,
//   //publicPath: config.output.publicPath
// })
// app.use(wdm)
// app.use(webpackHotMiddleware(compiler))
app.use(bodyParser())
app.use(routers.routes()).use(routers.allowedMethods())
app.listen(config.port,()=>{
     console.log(`监听端口${JSON.stringify(config.port)}`)
})

