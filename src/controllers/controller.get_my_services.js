const db=require("../config/conexion.js");

async function get_my_services(req,res){
        const {id}=req.usuario
        try {   
                const [result] = await db.execute('SELECT * FROM servicios_empleados WHERE id_empleado=?',[id])
                
            return res.json({my_services:result})
            
        } catch (error) {
            console.log(error)
            return res.json({msg:"Error al obtener los servicios"})
        }
}

module.exports=get_my_services;
