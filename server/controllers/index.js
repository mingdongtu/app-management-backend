//操作层
const infoService = require('./../services/index')
const qs = require('qs')
const jwt = require("jsonwebtoken")
const tools = require('./../utils/tool')
const secret = 'app_management_secret';
module.exports = {
      async getLogin(ctx){
        const data = ctx.request.url;
        const params = tools.parseUrl(data)
        let result =await infoService.getUserData(params)
        if(result.length===1){
            //  ctx.session.user = username
             ctx.body = {
             code:1,
             msg:'登录成功',
             token:jwt.sign({
              data:result[0].username,
              exp:Math.floor(Date.now()/1000)+6})
              
             },
             secret
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
        
          const data = ctx.request.url;
          const params = tools.parseUrl(data);
          const result = await infoService.getAppDetail(params);
          ctx.body = tools.dealResult(result,ctx)
      },
      async handleUpload(ctx){
           const data = ctx.request.url;
           const result = await infoService.handleUpload(ctx)
           ctx.body = result;
           
      }

}