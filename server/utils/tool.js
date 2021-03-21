function parseUrl(url){
      // url = "/apm/login?username=admin&password=1222"
      let cpurl = url.split('?')[1].split("&");
      let obj = {}
      cpurl.map(item=>{
           const temp = item.split("=");
           obj[temp[0]] =temp[1]
      })
      
      return obj 
}


module.exports = {
     parseUrl
}