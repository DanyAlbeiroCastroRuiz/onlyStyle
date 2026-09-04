const db=require("../config/conexion.js");

async function create_post(req,res){
    const {profesion,modalidad,punto_fisico,experiencia_laboral,diplomas}=req.body
    const {id}=req.usuario

    if(profesion && modalidad && punto_fisico && experiencia_laboral && diplomas){
        try {
        const [result]=await db.execute('INSERT INTO empleados(id_usuario,profesion,modalidad,punto_fisico,experiencia_laboral,diplomas) VALUES(?,?,?,?,?,?)',[id,profesion,modalidad,punto_fisico,experiencia_laboral,diplomas])
        
        if(result.length===0){
            return res.json({msg:"Datos incorrectos"})
        }
        const [result_2]=await db.execute('UPDATE usuarios SET rol=? WHERE id=?',["Empleado",id])
        if(result_2.length===0){
            return res.json({msg:"Datos incorrectos"})
        }

        return res.json({msg:"Postulacion exitosa",rol:'Empleado'})

    } catch (error) {
        console.log(error)
        res.status(401).json({msg: "Algo fallo"});
    }
    }
    
}

module.exports=create_post;