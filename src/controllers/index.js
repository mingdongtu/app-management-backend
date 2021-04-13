//操作层
const infoService = require('../services/index')
const fs = require('fs')
const path = require('path')
const jwt = require("jsonwebtoken")
const tools = require('../utils/tool')
const send = require("koa-send");
require('dotenv').config()

module.exports = {
      async getLogin(ctx){
        console.log('请求参数',ctx.request.body)
        const params = ctx.request.body;
        let result =await infoService.getUserData(params)
        if(result.length===1){
            //  ctx.session.user = username
            console.log('环境变量JWT_KEY',process.env.JWT_KEY)
             ctx.body = {
             code:1,
             msg:'登录成功',
             token:jwt.sign(
               {
              data:result[0].username,
              exp:Math.floor(Date.now()/1000)+60*60
              },
              process.env.JWT_KEY)
            }
            
             
        }else{
           ctx.body = {
                code:0,
                msg:"登录失败"
           }
        }
      },
      
      async getAppList(ctx){
         const data = ctx.request.url;
         const params = tools.parseUrl(data);
         const result = await infoService.getAppList(params)
         ctx.body = tools.dealResult(result,ctx)
      },
      async getAppDetail(ctx){
          console.log('control-getAppDetail')
          const data = ctx.request.url;
          const params = tools.parseUrl(data);
          const result = await infoService.getAppDetail(params);
          ctx.body = tools.dealResult(result,ctx)
      },
      async handleUpload(ctx){
           const data = ctx.request.url;
           const result = await infoService.handleUpload(ctx)
           ctx.body = result;
           
      },
      async handleDownload (ctx){
         
          const filePath = path.join(__dirname,`./../public/app-release.apk`)
          console.log('🐯🐯',filePath)
         const readStream = fs.createReadStream(filePath)
         ctx.type = 'apk'
         ctx.set('Content-disposition', 'attachment; filename=' +'app-release.apk')
         ctx.body = readStream
        
      }

}