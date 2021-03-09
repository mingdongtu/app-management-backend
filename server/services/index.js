//业务层代码
const infoModel = require('./../models/index')

const info = {
      async getUserData(data){
             let userData = await infoModel.getData(data)
             return userData
      }

}

module.exports = info