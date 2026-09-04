const db=require("../config/conexion.js");

async function create_category(req,res){
        const {nombre,descripcion,icono}=req.body
    if(nombre && descripcion && icono){
        try {
            const [result]=await db.execute('INSERT INTO categorias_servicios(nombre,descripcion,icono) VALUES(?,?,?)',[nombre,descripcion,icono])
            if(result.affectedRows==0){
                return res.json({msg:"Error al ingresar la categoria"})
            }
            return res.json({msg:"Categoria ingresada"})
        } catch (error) {
            console.log(error)
            return res.json({msg:"Error al ingresar la categoria"})
        }
        
    }
    return res.json({msg:"Error al ingresar la categoria"})
}

module.exports=create_category;