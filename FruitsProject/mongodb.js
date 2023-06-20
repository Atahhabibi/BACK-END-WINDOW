const { MongoClient } = require("mongodb");
const assert = require("node:assert");

const url = "mongodb://localhost:27017";

const dbName = "FruitsDB";

const client = new MongoClient(url, { useNewUrlParser: true });

const database = client.db(dbName);

async function Connection() {
  try {
    let connected = await client.connect();
    if (connected) {
      console.log("Connection succesfully to the server");
    }
  } catch (error) {
    console.log("Some error to the server");
  }
}

Connection();

async function getData() {
  let collection = database.collection("fruits");
  let response = await collection.find().toArray();
  console.log(response);
  client.close();
}

async function storeData() {
  inserDocument(database, function () {
    client.close();
  });
}

storeData();
getData();

function inserDocument(db, callback) {
  const collection = db.collection("fruits");
  collection.insertMany(
    [
      {
        name: "Apple",
        score: 8,
        review: "Great Fruit"
      },
      {
        name: "Orange",
        score: 6,
        review: "KInda sour"
      },
      {
        name: "banana",
        score: 6,
        review: "Kinda sour"
      }
    ],
    function (err, result) {
      assert.equal(err, null);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log("Inserted 3 document into the collections");
      callback(result);
    }
  );
}
