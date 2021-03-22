const dbUtils = require('./../utils/db')

const info = {
     async getLogin(data){
        console.log('调用models层',data)
          const {username,password} = data
          const sql = `SELECT * FROM userInfo WHERE username ="${username}"  AND password = "${password}"`;
          const  result = await dbUtils.query(sql)
          return result
     },
     async  getAppList(data){
        const sql = `SELECT * FROM appInfo` 
        const result =   await dbUtils.query(sql);
        return result
     }
}


module.exports = info 