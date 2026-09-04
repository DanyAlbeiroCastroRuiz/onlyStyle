const jwt=require("jsonwebtoken")
class createAcessToken{

    constructor(payload){
        this.payload=payload
    }

    crearToken(){
        
        try {
            const token= jwt.sign(this.payload,process.env.JWT_SECRET,{expiresIn:'2h'})
            return token
        } catch (error) {
            console.log('Fallo la creacion de tokens ',error)
            throw error
        }
        
    }
}
module.exports=createAcessToken;