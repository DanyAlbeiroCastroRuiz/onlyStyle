const db=require("../config/conexion.js");

async function get_my_citas(req,res){
        const id=req.usuario.id
        try {
            const [result]=await db.execute(`SELECT d.tiempo_total,d.fecha_inicio,d.fecha_fin,d.direccion,s.nombre,s.descripcion,s.precio,pg.estado 
                FROM pedidos AS p INNER JOIN detalle_pedido AS d ON p.id=d.id_pedido INNER JOIN servicios_empleados AS s ON d.servicio_id=s.id INNER JOIN pagos AS pg ON pg.id_pedido=p.id WHERE p.id_usuario=?`,[id])
            
          
            if(result.length==0){
                return res.json({msg:"No tienes citas pendientes"})
            }
            return res.json({my_citas:result})
        } catch (error) {
            console.log(error)
            return res.json({msg:"Error al ver tus citas"})
        }
}

module.exports=get_my_citas;