const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/FruitsDB", {
  useNewUrlParser: true
});

const frutisSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

const personsSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Fruit = mongoose.model("Fruit", frutisSchema);
const Person = new mongoose.model("Person", personsSchema);

const fruit = new Fruit({
  name: "Apple",
  score: 8,
  review: "Great Fruit"
});

const person = new Person({
  name: "John",
  age: 35
});

const kiwi = new Fruit({
  name: "Kiwi",
  score: 10,
  review: "The best Fruits"
});

const banana = new Fruit({
  name: "banana",
  score: 4,
  review: "The yellow Fruits"
});

const orange = new Fruit({
  name: "orange",
  score: 6,
  review: "The sour Fruits"
});

Fruit.insertMany([kiwi, orange, banana])
  .then(() => {
    console.log("Succesfuly send to the DB");
  })
  .catch((err) => {
    console.log(err);
  });

Fruit.find()
  .then((fruits) => {
    fruits.map((item) => {
      console.log(item.name);
      mongoose.connection.close();
    });
  })
  .catch((err) => {
    console.log(err);
  });

// person.save();

// fruit.save();
