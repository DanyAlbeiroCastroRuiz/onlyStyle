const db=require("../config/conexion.js");

async function get_category(req,res){
        
        try {
            
            const [result]=await db.execute('SELECT * FROM categorias_servicios')
            return res.json({categorias:result})
            
        } catch (error) {
            console.log(error)
            return res.json({msg:"Error al obteners las categoria"})
        }
        
    
    
}

module.exports=get_category;