const notFoundMiddleWare = require("./middleware/not-found");
const errorHandlerMiddleWare = require("./middleware/error-handler");
require("dotenv").config();
const connectDB = require("./db/connect");
require("express-async-errors");
const express = require("express");
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload=require('express-fileupload')


const authRouter = require("./routes/authRoutes");
const userRouter=require('./routes/userRoutes');
const productsRouter=require('./routes/productsRoute')
const reviewRouter=require('./routes/reviewRoutes');

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static('./public'));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("<h1>E-COMMERCE-API</h1>");
});



app.use("/api/v1/auth", authRouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/products',productsRouter)
app.use('/api/v1/reviews',reviewRouter)

app.use(notFoundMiddleWare);
app.use(errorHandlerMiddleWare);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() => {
      console.log("CONNNECT TO  MONGODB");
    });

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
