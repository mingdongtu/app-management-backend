//操作层
const infoService = require('./../services/index')
const qs = require('qs')
const tools = require('./../utils/tool')

module.exports = {
      async getLogin(ctx){
        const data = ctx.request.url;
        const params = tools.parseUrl(data)
        const result =await infoService.getUserData(params)
        ctx.body = tools.dealResult(result,ctx)
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
          console.log(params)
          const result = await infoService.getAppDetail(params);
    

          ctx.body = tools.dealResult(result,ctx)
      }

}