require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");

const jsonProduct = require("./products.json");


const start=async()=>{
   try {
   await connectDB(`${process.env.CONNECTION_STRING}`);
   console.log('sucess!!!!');
   await Product.deleteMany();
   await Product.create(jsonProduct)
   process.exit(0)
   } catch (error) {
    console.log(error);
     process.exit(1);
   }
}

start();