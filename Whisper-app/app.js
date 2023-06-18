//jshint esversion:6

const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const app=express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.listen(3000,()=>{
    console.log("************ Server Runing port 3000****************");
})

app.get('/',(req,res)=>{
    res.send('<h1>Salam</h1>')
})





