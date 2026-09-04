const path=require("path")
function register_page(req,res){
    res.sendFile(path.join(__dirname,'..','..','..','public','html','register.html'))
}
module.exports=register_page;