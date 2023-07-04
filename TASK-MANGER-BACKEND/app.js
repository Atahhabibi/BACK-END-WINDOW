const connectDB = require("./db/connect");
const express = require("express");
const tasks = require("./routes/task");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(express.static("./public"));
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(`${process.env.CONNECTION_STRING}/TASK-MANAGER`);
    console.log("===== CONNECTED TO MONGODB ======");
    app.listen(port, () => {
      console.log(`******SERVER LISTENING PORT:${port} **********`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
