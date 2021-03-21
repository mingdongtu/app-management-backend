//操作层
const infoService = require('./../services/index')
const qs = require('qs')
const tools = require('./../utils/tool')
module.exports = {
      async getLogin(ctx){
        const data = ctx.request.url;
       
         const params = tools.parseUrl(data)
           let result =await infoService.getUserData(data)
           console.log(tools.parseUrl(data),result[0])
          
           ctx.body ={
                code:0,
                msg:'登录成功',
                data:result
           }
          //  ctx.body =result  
           
      }
}