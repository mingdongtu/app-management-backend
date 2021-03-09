const dbUtils = require('./../utils/db')

const info = {
     async getData(data){
        console.log('调用models层',data)
          let sql = 'select * from userInfo';
          let  result = await dbUtils.query(sql)
          return result
     }
}


module.exports = info 