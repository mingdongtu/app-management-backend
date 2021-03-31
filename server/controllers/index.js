//操作层
const infoService = require('./../services/index')
const qs = require('qs')
const jwt = require("jsonwebtoken")
const tools = require('./../utils/tool')
const secret = 'this is secret';
module.exports = {
      async getLogin(ctx){
        const data = ctx.request.url;
        const params = tools.parseUrl(data)
        const {username} = params
        let result =await infoService.getUserData(params)
        if(result.length===1){
             ctx.session.user = username
        }
       
        ctx.body = {
             userInfo :tools.dealResult(result,ctx),
             token:jwt.sign({
                  data:result[0].username,
                  exp:Math.floor(Date.now()/100)+60*60
             },
             secret
             )
        }
        
      },
      async getAppList(ctx){
        console.log("看下session",ctx.session)
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