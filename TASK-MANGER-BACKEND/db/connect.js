const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(`${process.env.CONNECTION_STRING}/TASK-MANAGER`);
};

module.exports = connectDB;
