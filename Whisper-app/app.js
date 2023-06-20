
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();


const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const secret="thisisourlittlesecret."
userSchema.plugin(encrypt, {
  secret: process.env.SECRET_KEY,
  encryptedFields: ["password"],
});


const User = new mongoose.model("User", userSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("************ Server Runing port 3000****************");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    email: username,
    password: password,
  });

  newUser
    .save()
    .then(() => {
      res.render("secrets");
    })
    .catch((err) => console.log(err));
});

app.post("/login", (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  User.findOne({ email})
    .then((result) => {
      if (result) {
        if (result.password === password) {
          res.render("secrets");
        }
      } else {
        res.render("No user exist with such email and password");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
