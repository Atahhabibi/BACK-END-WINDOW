require("dotenv").config();

require('express-async-errors');
const express = require("express");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connect");
const routes=require('./routes/products')


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1> <a href="/api/v1/product">products route</a>`);
});

app.use('/api/v1/products',routes)

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = 3000 || process.env.PORT;

const start = async () => {
  try {
    await connectDB(`${process.env.CONNECTION_STRING}`).then(()=>{
        console.log(
          `*************CONNNECTED TO MONGODB******************`
        );
    });

    app.listen(port, (req, res) => {
      console.log(
        `*************SERVER LISTENING PORT ${port}******************`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
