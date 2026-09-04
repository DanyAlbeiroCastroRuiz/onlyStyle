const mysql=require("mysql2/promise")

const db=mysql.createPool({
        user:"root",
        host:"localhost",
        password:"21556142D@ny",
        port:"3306",
        database:"onliStyle",
})
    
module.exports=db;
