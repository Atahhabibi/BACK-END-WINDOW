const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
var _ = require("lodash");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: "true" }));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", {
  useNewUrlParser: true,
});

const itemsSchema = {
  name: String,
};

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const Item = mongoose.model("Item", itemsSchema);
const List = mongoose.model("List", listSchema);

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

      res.render("list", {
        kindOfDay: _.lowerCase("Today"),
        newListItems: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/:customListName", (req, res) => {
  const customListName = _.lowerCase(req.params.customListName);

  List.findOne({ name: customListName })
    .then((result) => {
      if (!result) {
        const list = new List({
          name: customListName,
          items: defaultItems,
        });

        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {
          kindOfDay: customListName,
          newListItems: [...result.items],
        });
      }
    })
    .catch((err) => console.log(err));
});

app.post("/", (req, res) => {
  const tempName = req.body.item;
  const listName = _.lowerCase(req.body.list);

  const item = new Item({
    name: tempName,
  });

  if (listName === _.lowerCase("Today")) {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName })
      .then((result) => {
        result.items.push(item);
        result.save();
        res.redirect("/" + listName);
      })
      .catch((err) => console.log(err));
  }
});

app.post("/delete", (req, res) => {
  const id = req.body.id;
  const listName = _.lowerCase(req.body.listName);
  if (listName === _.lowerCase("Today")) {
    Item.findByIdAndRemove(id)
      .then(() => {
        console.log("successfully deleted");
      })
      .catch((err) => {
        console.log(err);
      });

    res.redirect("/");
  } else {
    List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: id } } })
      .then((result) => {
        result.save();
      })
      .catch((err) => {
        console.log(err);
      });

    res.redirect("/" + listName);
  }
});
