// 建立数据库连接
const config = require('./../../config')
const dataBaseConfig = config.database
const mysql = require('mysql2');
// 建立数据库
const mysqlPool = mysql.createPool({
     host:dataBaseConfig.HOST,
     user:dataBaseConfig.USERNAME,
     password:dataBaseConfig.PASSWORD,
     database:dataBaseConfig.DATABASE
})
const query = (sql,values)=>{
       return new Promise((resolve,reject)=>{
              mysqlPool.getConnection((err,connection)=>{
                // console.log('查询数据库',err,connection)
                  if(err){
                      resolve(err)
                  }else{
                      //  查询数据库
                      connection.query(sql,values,(err,rows)=>{
                           if(err){
                               reject(err)
                           }else{
                            
                               resolve(rows)
                           }
                          //  释放连接
                       connection.release
                      })
                  }
              })
       })
}

module.exports = {
    query
}