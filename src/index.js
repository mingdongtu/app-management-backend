//服务入口文件

const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const app = new Koa();
const config = require('../config')
const routers = require('./routers/index')
const cors = require('koa2-cors');
const koaBody = require("koa-body");
const jwt = require('jsonwebtoken');
const kojak = require('koa-jwt');
// const dotenv = require('dotenv');
// app.use(dotenv).config()
// const session = require('koa-session');
// const redisStore = require('koa-redis');
// const redis = require('redis');
// const client = redis.createClient(6379,"localhost")
// app.keys = ['this is my secret.thank you!']
// const sessionConfig = {
//   key:'koa:session',
//   maxAge:3600000,
//   overwrite:true,
//   httpOnly:true,
//   signed:true,
//   store:redisStore({client})
// }
// app.use(session(sessionConfig,app))
//规则之外的请求接口都需要进行需要进行token验证
app.use(
  kojak({
    secret:process.env.JWT_KEY
  }).unless({
       path:[/\/login$/,/\/download$/]
  })
)
// token 验证的中间件
app.use((ctx,next)=>{
     
    
     if(ctx.header && ctx.header.authorization){
          const parts = ctx.header.authorization.split(' ');
          if(parts.length===2){
              const scheme = parts[0];
              const token = parts[1];
              if(/^Bearer$/i.test(scheme)){
                   try {
                        jwt.verify(token,secret,{
                          complete:true
                        });
                   }catch (err){
                         
                   }
              }
          }
     }
    return next().catch(err=>{
         if(err.status===401){
              ctx.status = 401;
              ctx.body = "认证失败"
         }else{
             throw err 
         }
    })
})
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


