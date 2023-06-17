const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

app.listen(3000, (req, res) => {
  console.log("Server starting 3000");
});

app.get("/articles", (req, res) => {
  Article.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => console.log(err));

   
});
