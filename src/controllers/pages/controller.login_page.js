const path=require("path")
function login_page(req,res){
    res.sendFile(path.join(__dirname,'..','..','..','public','html','login.html'))
}

module.exports=login_page;