import { MongoClient } from 'mongodb';
import {
  ObjectId
} from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$match': {
      'product': new ObjectId('64bd27a49069dabb4ceca3e0')
    }
  }, {
    '$group': {
      '_id': null, 
      'averageRating': {
        '$avg': '$rating'
      }, 
      'numOfReviews': {
        '$sum': 1
      }
    }
  }
];

const client = await MongoClient.connect(
  'mongodb+srv://admin-atah:jan@cluster0.clahmhi.mongodb.net/',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('E-COMMERCE').collection('reviews');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();