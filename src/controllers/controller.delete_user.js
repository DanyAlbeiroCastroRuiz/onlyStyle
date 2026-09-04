const { json } = require("express");
const db=require("../config/conexion.js");
const passwd=require("../models/model_hash.js")

async function delete_user(req,res){
    const {contrasena}=req.body
    const {id}=req.usuario
    try {
        const [result]=await db.execute('SELECT hash FROM usuarios WHERE id=?',[id])
        
        if(result.length===0){
            return res.json({msg:"Datos incorrectos"})
        }

        const validar_hash=new passwd(contrasena,undefined,result[0].hash)
        
        if(await validar_hash.compareHash()){
           const respuesta=await db.execute('DELETE FROM usuarios WHERE id=?',[id])
           
           if(respuesta.affectedRows===0){
                res.json({msg:"No se pudo eliminar el usuario"})
           }

           return res.json({msg:"usuario eliminado"})

        }else{
            return res.json({msg:"Datos incorrectos"})
        }

    } catch (error) {
        console.log(error)
        res.status(401).json({msg: "Algo fallo"});
    }
}

module.exports=delete_user;