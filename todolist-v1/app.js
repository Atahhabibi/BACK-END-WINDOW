const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: "true" }));
var newItems = ["Buy Food", "Cook Food", "Eat food"];

app.listen("3000", (req, res) => {
  console.log("SERVER LISTENING PORT : 3000");
});

app.get("/", (req, res) => {
  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { kindOfDay: day, newListItems: newItems });
});

app.post("/", (req, res) => {
  item = req.body.item;
  newItems.push(item);
  res.redirect("/");
});
