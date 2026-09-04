const db=require("../config/conexion.js");

async function agendar(req,res){
        const {servicio_id,direccion}=req.body;
        const fecha_inicio_u=new Date(req.body.fecha_inicio)
        const id=req.usuario.id

        const fecha_fin_u=new Date(fecha_inicio_u);
        fecha_fin_u.setMinutes(fecha_fin_u.getMinutes() + 30);
        const fecha_actual=new Date()

        if(fecha_inicio_u < fecha_actual){
            return res.json({msg:"Selecionaste una fecha y hora que ya paso"})
        }

        try {
            const [result]=await db.execute('SELECT fecha_inicio,fecha_fin FROM detalle_pedido WHERE fecha_inicio=?',[fecha_inicio_u])
       
            if(result.length > 0){
                if(fecha_inicio_u>=result[0].fecha_inicio &&  fecha_inicio_u < result[0].fecha_fin){
                    return res.json({msg:"Hora en un rango ya agendada"})
                }
                return res.json({msg:"Hora ya agendada"})
            }
            
            const [result_2]=await db.execute("SELECT * FROM servicios_empleados WHERE id=?",[servicio_id])
            if(result_2.length==0){
                return res.json({msg:"Servicio no existente."})
            }
           if(result_2[0].disponible!=1){
                return res.json({msg:"Servicio no disponible."})
           }
            const [result_3]=await db.execute("INSERT INTO pedidos (id_usuario,total) VALUES (?,?)",[id,result_2[0].precio])
            if(result_3.affectedRows==0){
                return res.json({msg:"No se realizo el pedido."})
            }
            
            
            const [result_4]=await db.execute("INSERT INTO detalle_pedido (id_pedido,servicio_id,tiempo_total,fecha_inicio,fecha_fin,direccion) VALUES(?,?,?,?,?,?)",[result_3.insertId,result_2[0].id,30,fecha_inicio_u,fecha_fin_u,direccion])
            if(result_4.length==0){
                return res.json({msg:"No se realizo el detalle pedido"})
            }
  
          
            const [result_5]=await db.execute("INSERT INTO pagos (id_pedido,monto) VALUES (?,?)",[result_3.insertId,result_2[0].precio])
            if(result_5.affectedRows==0){
                return res.json({msg:"No se genero el reporte del pago."})
            }
            return res.json({msg:"Pedido realizado, Encuntra mas infomacion en Mis citas"})

        } catch (error) {
            console.log(error)
            return res.json({msg:"Error el pedido"})
        }
        
    
}

module.exports=agendar;