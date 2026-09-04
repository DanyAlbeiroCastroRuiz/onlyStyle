const db=require("../config/conexion.js");

async function delete_category(req,res){
        const id =req.params.id
    
        try {
            const [result]=await db.execute('DELETE FROM categorias_servicios WHERE id=?',[id])
            if(result.affectedRows==0){

                return res.json({msg:"Erro al eliminar la categoria"})
            }
            return res.json({msg:"Categoria eliminada"})
        } catch (error) {
            console.log(error)
            return res.json({msg:"Error al eliminar la categoria"})
        }
        
    
    
}

module.exports=delete_category;