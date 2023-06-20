const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/FruitsDB", {
  useNewUrlParser: true
});

const frutisSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please check your data entery no name is spcecified"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
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
  rating: 9,
  review: "Great Fruit"
});
const kiwi = new Fruit({
  rating: 8,
  review: "Great Fruit"
});

const person = new Person({
  name: "John",
  age: 35
});

// Fruit.find()
//   .then((fruits) => {
//     fruits.map((item) => {
//       console.log(item.name);
//       mongoose.connection.close();
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// person.save();

// fruit.save();

Fruit.updateOne({ _id: "6489e9f5d43286b74e51d53a" }, { rating: 3 })
  .then(() => {
    console.log("Successfully update the item");
  })
  .catch((err) => {
    console.log(err);
  });
