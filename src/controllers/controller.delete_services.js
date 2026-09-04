const db=require("../config/conexion.js");

async function delete_services(req,res){
        const id =req.params.id
        const rol=req.usuario.rol
        const id_empleado=req.usuario.id
        
        if(rol !='Admin' && rol !='Empleado'){
            return res.json({msg:"No tienes los permisos necesarios."})
        }
        try {
            const [result]=await db.execute('DELETE FROM servicios_empleados WHERE id=? AND id_empleado=?',[id,id_empleado])
            if(result.affectedRows==0){
                return res.json({msg:"Erro al eliminar la categoria"})
            }
            return res.json({msg:"Categoria eliminada"})
        } catch (error) {
            console.log(error)
            return res.json({msg:"Error al eliminar la categoria"})
        }
        
    
    
}

module.exports=delete_services;