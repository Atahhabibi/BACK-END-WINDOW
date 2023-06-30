const express=require('express');

const app=express();


app.listen(3000,()=>{
  console.log("*************SERVER LISTENING PORT: 3000 ************");
})


app.get('/',(req,res)=>{
  res.status(200).send('<h1>Home Page</h1>')
})

app.get('/about',(req,res)=>{
  res.status(200).send('<h1>About Page</h1>')
})


app.get('/about',(req,res)=>{
  res.status(404).send('<h1>About Page</h1>')
})

app.all('*',(req,res)=>{
  res.send('<h1>PAGE NOT FOUND</h1>')
})