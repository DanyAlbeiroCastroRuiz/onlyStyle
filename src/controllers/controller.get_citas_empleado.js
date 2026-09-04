const db=require("../config/conexion.js");

async function get_citas_empleado(req,res){
    const id=req.usuario.id
    try {
        const [result]=await db.execute(`SELECT dp.id AS detalle_id, dp.fecha_inicio, dp.fecha_fin, dp.direccion, dp.tiempo_total,s.nombre AS nombre_servicio, s.precio,
            u.nombre AS nombre_cliente, u.telefono AS telefono_cliente,
            pg.estado FROM servicios_empleados AS s INNER JOIN detalle_pedido AS dp ON dp.servicio_id = s.id INNER JOIN pedidos AS p ON dp.id_pedido = p.id
            INNER JOIN usuarios AS u ON p.id_usuario = u.id
            INNER JOIN pagos AS pg ON pg.id_pedido = p.id
            WHERE s.id_empleado = ?
            ORDER BY dp.fecha_inicio DESC`,
            [id]
        )

        if(result.length==0){
            return res.json({msg:"No tienes citas agendadas"})
        }
        return res.json({citas_empleado:result})
    } catch (error) {
        console.log(error)
        return res.json({msg:"Error al obtener las citas"})
    }
}

module.exports=get_citas_empleado;
