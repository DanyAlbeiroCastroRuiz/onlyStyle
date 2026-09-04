const db = require("../config/conexion.js");

async function update_perfil(req, res){
    const {nombre, telefono, correo} = req.body;
    const {id} = req.usuario;
    
    try {
        const [usuario] = await db.execute('SELECT correo,nombre,telefono FROM usuarios WHERE id=?',[id]
        );

        if(usuario.length === 0){
            return res.status(404).json({msg: "No se encontró el usuario"});
        }

        const campos = [];
        const params = [];

        if(correo && correo !== usuario[0].correo){
            campos.push("correo=?");
            params.push(correo);
        }

        if(nombre && nombre !== usuario[0].nombre){
            campos.push("nombre=?");
            params.push(nombre);
        }

        if(telefono && telefono !== usuario[0].telefono){
            campos.push("telefono=?");
            params.push(telefono);
        }


        if(campos.length === 0){
            return res.status(200).json({msg: "No hubo cambios para guardar"});
        }

        const [resultado] = await db.execute(`UPDATE usuarios SET ${campos.join(',')} WHERE id=?`,[...params, id]);


        if(resultado.changedRows > 0){
            return res.status(200).json({msg: "Cambios guardados correctamente"});
        }

        return res.status(400).json({msg: "No se pudieron guardar los cambios"});


    } catch(error){
        console.log(error);

        res.status(500).json({msg: "Error interno del servidor"});
    }
}

module.exports = update_perfil;