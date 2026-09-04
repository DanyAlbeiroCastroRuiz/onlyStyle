const db=require("../config/conexion.js");

async function update_cita_estado(req,res){
    const id_empleado=req.usuario.id
    const {detalle_id}=req.params
    const {estado}=req.body

    if(!estado || !["cancelado","pagado"].includes(estado)){
        return res.json({msg:"Estado no válido"})
    }

    try {
        const [result]=await db.execute(
            `SELECT pg.id AS pago_id, pg.estado
             FROM detalle_pedido AS dp
             INNER JOIN pedidos AS p ON dp.id_pedido = p.id
             INNER JOIN pagos AS pg ON pg.id_pedido = p.id
             INNER JOIN servicios_empleados AS s ON dp.servicio_id = s.id
             WHERE dp.id = ? AND s.id_empleado = ?`,
            [detalle_id, id_empleado]
        )

        if(result.length==0){
            return res.json({msg:"Cita no encontrada o no tienes permiso"})
        }

        if(String(result[0].estado).toLowerCase() !== "pendiente"){
            return res.json({msg:"Solo puedes modificar citas en estado pendiente"})
        }

        const [result_2]=await db.execute(
            `UPDATE pagos SET estado=? WHERE id=?`,
            [estado, result[0].pago_id]
        )

        if(result_2.affectedRows==0){
            return res.json({msg:"No se pudo actualizar el estado"})
        }

        const label=estado==="pagado" ? "completada" : "cancelada"
        return res.json({msg:`Cita ${label} correctamente`})

    } catch (error) {
        console.log(error)
        return res.json({msg:"Error al actualizar el estado de la cita"})
    }
}

module.exports=update_cita_estado;
