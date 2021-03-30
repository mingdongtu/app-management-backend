//服务入口文件

const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const config = require('../config')
const routers = require('./routers/index')
const cors = require('koa2-cors');
const koaBody = require("koa-body");
const session = require('koa-session');
app.keys = ['this is my secret.thank you!']
app.use(session({
    key:'koa:session',
    maxAge:3600000,
    overwrite:true,
    httpOnly:true,
    signed:true
},app))

app
.use(koaBody({
  multipart: true, // 允许上传或下载文件
  formidable: {
    maxFileSize: 20000*1024*1024 // 限制上传或下载的文件的大小
  }
}))
.use(cors({
  origin: function(ctx) {
    // 可以放行/限制某些域名请求的跨域
    // if (ctx.url === '/apm/upload') {
    //   return false;
    // }
    return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(bodyParser())
app.use(routers.routes()).use(routers.allowedMethods())
app.listen(config.port,()=>{
     console.log(`监听端口${JSON.stringify(config.port)}`)
})

