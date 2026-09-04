const path=require("path");

function citas_empleado_page(req,res){
    res.sendFile(path.join(__dirname,'..','..','..','public','html','citas_empleado.html'))
}

module.exports=citas_empleado_page;
