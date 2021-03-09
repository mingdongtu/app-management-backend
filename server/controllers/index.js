//操作层
const infoService = require('./../services/index')

module.exports = {
      async getLogin(ctx){
        const data = ctx.request.body;
         console.log(`请求参数${ctx.request}`)
           let result =await infoService.getUserData(data)
           
          
           ctx.body ={
                code:0,
                msg:'登录成功',
                data:result
           }
          //  ctx.body =result  
           
      }
}