const dbUtils = require('./../utils/db')

const info = {
     async getData(data){
        console.log('调用models层',data)
        const {username,password} = data
          let sql = `SELECT * FROM userInfo WHERE username ="${username}"  AND password = "${password}"`;
           console.log("我的查询语句",sql)
          let  result = await dbUtils.query(sql)
          return result
     }
}


module.exports = info 