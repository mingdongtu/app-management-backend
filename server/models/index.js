
// 查询数据库
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
        const sql = `SELECT * FROM app_info` 
        const result =   await dbUtils.query(sql);
        console.log('app_info数据',result)
        return result
     },
     async getAppDetail(data){
          const sql = `SELECT * FROM app_detail`
          const a = '1';
          const infoSql = `SELECT id,application_name,bundle_id,application_type,application_logo FROM app_info WHERE app_id = ${a}`;
          const result = await dbUtils.query(sql)
          // 从app_info表中查询
          const infoDetail = await dbUtils.query(infoSql);
          console.log('app_detail数据',infoDetail)
          return {
              detail:infoDetail[0]||{},
              list:result
          }
     }
}


module.exports = info 
