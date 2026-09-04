const db=require("../config/conexion.js");

async function get_services(req,res){
        
        try {
            
            const [result]=await db.execute('SELECT * FROM servicios_empleados')
            
            return res.json({servicios:result})
            
        } catch (error) {
            console.log(error)
            return res.json({msg:"Error al obteners los servicios"})
        }
        
}

module.exports=get_services;