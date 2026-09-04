const app=require("./app.js")
require("dotenv").config()

app.listen(process.env.PORT,()=>{
    console.log('Servidor iniciado ',process.env.PORT)
})