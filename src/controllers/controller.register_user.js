const db=require("../config/conexion.js");
const passwd=require("../models/model_hash.js")

async function user_register(req,res){
    const {nombre,ced,correo,telefono,fecha_n,contrasena} =req.body;
    const fecha=new Date(fecha_n);

    if(nombre.length <= 100 && correo.length <= 100 && telefono.length <= 20 && contrasena.length <= 255 && ced.length <=20 && !isNaN(fecha.getTime())){

        const class_hash=new passwd(contrasena,10);
        const hash=await class_hash.generarHash()

        try {

            await db.execute("INSERT INTO usuarios(id,nombre,correo,hash,telefono,fecha_nacimiento,rol) VALUES(?,?,?,?,?,?,?)",[ced,nombre,correo,hash,telefono,fecha_n,'USUARIO']);
            console.log("Registro exitoso :",nombre)
            return res.json({msg:"Registro exitoso"})

        } catch (error) {
            if(error.code=='ER_DUP_ENTRY'){
                return res.json({msg:"Usuario ya existente."})
            }else{
                console.log(error)
            }
        }
        
    }
    res.json({msg:"Algo fallo en la validacion de los parametros requeridos."})
    
}

module.exports=user_register;