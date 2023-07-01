const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  const name = req.body.name;

  if (name) {
    return res.status(200).send(`<h1>Welcome ${name}</h1>`);
  } else {
    return res.status(401).send("Please provide credentials");
  }
});



module.exports = router;
