//操作层
const infoService = require('./../services/index')
const qs = require('qs')
const tools = require('./../utils/tool')
module.exports = {
      async getLogin(ctx){
        const data = ctx.request.url;
         const params = tools.parseUrl(data)
           let result =await infoService.getUserData(params)
           if(result.length<1){
                //  没有这个用户
                ctx.body ={
                  code:0,
                  msg:'不存在这个用户',
                  data:{}
             }
           }else{
            ctx.body ={
              code:1,
              msg:'登录成功',
              data:result
         }
           }  
           
      }
}