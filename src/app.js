const express=require("express");
const app=express();
const path=require("path")
const routes=require('./routes/routes.js')

app.use(express.static(path.join(__dirname ,"..","public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes)

module.exports=app;