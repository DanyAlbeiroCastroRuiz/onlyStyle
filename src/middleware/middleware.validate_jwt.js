const jwt=require("jsonwebtoken")

function validateTokenAccess(req,res,next){
    const authHeader =req.headers.authorization;
    if(!authHeader){return res.status(401).json({ message: "No autorizado" })}

    const token=authHeader.split(" ")[1]
    try{
        const datos=jwt.verify(token,process.env.JWT_SECRET)
        req.usuario=datos
        
        next();
    }catch(error){
        
        if(error.name=="TokenExpiredError"){     
            console.log(2)       
            return res.json({ msg: "Sesion inválida o expirada, cierra session y vuelve a ingresar."});
        }
        console.log("Fallo la validación del token:", error);
        return res.json({ msg: "Algo fallo."});
    }
}

module.exports=validateTokenAccess;