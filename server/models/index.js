
// 查询数据库
const dbUtils = require('./../utils/db')
const tools = require("./../utils/tool")
const fs = require('fs')
const path = require('path')
const AppInfoParserApk = require("app-info-parser");
const info = {
     async getLogin(data){
        
          const {username,password} = data
          const sql = `SELECT * FROM userInfo WHERE username ="${username}"  AND password = "${password}"`;
          const  result = await dbUtils.query(sql);
          console.log('返回结果',data,username,password)
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
          console.log('app_detail数据')
          const infoSql = `SELECT id,application_name,bundle_id,application_type,application_logo FROM app_info WHERE app_id = ${a}`;
          const result = await dbUtils.query(sql)
          // 从app_info表中查询
          const infoDetail = await dbUtils.query(infoSql);
          
          return {
              detail:infoDetail[0]||{},
              list:result
          }
     },
     async handleUpload(ctx){
          // 处理上传文件
         const getsql = ()=>{
         return  new Promise((resolve,reject)=>{
            try{
              
               const file = ctx.request.files.file;
               const reader = fs.createReadStream(file.path);
               const filePath = path.join(__dirname,`./../public/${file.name}`)
               const upStream = fs.createWriteStream(filePath);
               reader.pipe(upStream);
              //  解析app包update app_detail数据库
              let sql ;
              
              reader.on("end",()=>{
                console.log("获取文件信息")
                const parser = new AppInfoParserApk(filePath)
                // 获取文件大小
                let package_volume ;
                fs.stat(filePath,(err,stats)=>{
                    console.log('app大小',parseInt(stats.size/(1024*1024)*100)/100)
                      !err && (package_volume = parseInt(stats.size/(1024*1024)*100)/100)
                })
                parser.parse().then(res=>{
                  const {versionName:edition,package:bundle_id} = res
                  console.log('数据类型',typeof edition,typeof bundle_id,typeof package_volume)
                  const data = {edition,package_volume,bundle_id}
                  // 插入数据到表中
                  sql = tools.insertAppDetail(data)
                  resolve(sql)
                }) 
              })
              
              
            }catch(err){
                reject(err)
            }   
       })
         }
      
      const sql = await getsql();
      console.log('sql语句',sql)
      const result = await dbUtils.query(sql)
      return result

     }
}


module.exports = info 
