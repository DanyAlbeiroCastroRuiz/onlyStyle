const db=require("../config/conexion.js");

async function get_users(req,res){
    const rol =req.usuario.rol
        try {
            if(rol =="Admin"){
                const [result]=await db.execute('SELECT id, nombre, correo, telefono, fecha_nacimiento, rol, fecha_registro, activo FROM usuarios')
                return res.json({usuarios:result})
            }
        } catch (error) {
            console.log(error)
            return res.json({msg:"Error al obteners las categoria"})
        }
        
}

module.exports=get_users;