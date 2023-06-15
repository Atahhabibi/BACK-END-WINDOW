const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: "true" }));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {
  useNewUrlParser: true,
});

const itemsSchema = {
  name: String,
};
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to you todoList!",
});

const item2 = new Item({
  name: "Click Add Button to add new Item ",
});

const item3 = new Item({
  name: "HIt this to delete the item",
});

const defaultItems = [item1, item2, item3];

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

  Item.find()
    .then((result) => {
      if (result.length === 0) {
        Item.insertMany(defaultItems)
          .then(() => {
            console.log("Successfully saved deafultItems to database");
          })
          .catch((err) => {
            console.log(err);
          });
        res.redirect("/");
      }

      res.render("list", { kindOfDay: day, newListItems: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/", (req, res) => {
  const tempName = req.body.item;

  const item = new Item({
    name: tempName,
  });

  item.save();

  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const id = req.body.id;

  Item.findByIdAndRemove(id).then(()=>{
    console.log("successfully deleted");
  }).catch((err)=>{console.log(err);})

  res.redirect("/");
});
