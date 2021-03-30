//业务层代码
const infoModel = require('./../models/index')

const info = {
      async getUserData(data){
             const userData = await infoModel.getLogin(data)
             return userData
      },
      async getAppList(data){
             const appList = await infoModel.getAppList(data)
             return appList
      },
      async getAppDetail(data){
            const appDetail = await infoModel.getAppDetail(data)
            return appDetail
      },
      async handleUpload(ctx){
       
           const result = await infoModel.handleUpload(ctx)
           return result;
      }

}

module.exports = info