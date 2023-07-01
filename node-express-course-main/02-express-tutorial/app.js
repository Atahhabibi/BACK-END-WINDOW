const express = require("express");
const people=require('./routes/people')
const auth=require('./routes/auth')

const app = express();

app.use(express.static("./methods-public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/people',people)
app.use('/login',auth)

app.listen(3000, () => {
  console.log("*************SERVER LISTENING PORT: 3000 ************");
});







