function parseUrl(url){
      // url = "/apm/login?username=admin&password=1222"
      let obj = {}
      if(url.includes("?")){
        let cpurl = url.split('?')[1].split("&");
        cpurl.map(item=>{
             const temp = item.split("=");
             obj[temp[0]] =temp[1]
        })
      }
      
      return obj 
}
function dealResult(result,ctx){
  let res ;
  if(result&&result.length&&result.length<1){
    //  没有这个用户
    res ={code:0,msg:'不存在这个用户',data:{} }
   }else{
     res ={code:1,msg:'success',data:result}
   }
  return res
}

module.exports = {
     parseUrl,
     dealResult
}