const db=require("../config/conexion.js");
const passwd=require("../models/model_hash.js")
const createAcessToken=require("../models/model_create_jwt.js")

async function login_user(req,res){
    const {correo,contrasena}=req.body
    try {
        const [result]=await db.execute('SELECT correo,id,hash,rol,nombre,telefono FROM usuarios WHERE correo=?',[correo])
  
        if(result.length===0){
            return res.json({msg:"Datos incorrectos"})
        }

        const hash=new passwd(contrasena,undefined,result[0].hash)
        if(await hash.compareHash()){
            const token=new createAcessToken({id:result[0].id,rol:result[0].rol})
            res.json({msg:"Session exitosa",token:token.crearToken(),rol:result[0].rol,nombre:result[0].nombre,correo:result[0].correo,telefono:result[0].telefono})

        }else{
            return res.json({msg:"Datos incorrectos"})
        }


    } catch (error) {
        console.log(error)
        res.status(401).json({msg: "Algo fallo"});
    }
}

module.exports=login_user;