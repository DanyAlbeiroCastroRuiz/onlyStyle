const db=require("../config/conexion.js");

async function create_services(req,res){
        const {nombre,id_categoria,descripcion,precio,duracion_estimada,modalidad,punto_fisico}=req.body
        const {id}=req.usuario;
    if(nombre && id_categoria && descripcion && precio && modalidad){
        try {
            const [result]=await db.execute('INSERT INTO servicios_empleados(id_empleado,id_categoria,nombre,descripcion,modalidad,punto_fisico,precio) VALUES(?,?,?,?,?,?,?)',[id,id_categoria,nombre,descripcion,modalidad,punto_fisico,precio])
            if(result.affectedRows==0){

                return res.json({msg:"Erro al ingresar el servicio"})
            }
            return res.json({msg:"Servicio ingresada"})
        } catch (error) {
            console.log(error)
            return res.json({msg:"Error al ingresar el servicio"})
        }
        
    }
    return res.json({msg:"Error al ingresar el servicio"})
}

module.exports=create_services;