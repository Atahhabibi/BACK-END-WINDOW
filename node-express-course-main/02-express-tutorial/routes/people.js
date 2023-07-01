const express = require("express");
let { people, products } = require("../data");

const {
  createPerson,
  createPersonPostman,
  deletePerson,
  upDatePerson,
  getPeople
} = require("../Controllers/people");

const router = express.Router();

router.get("/", getPeople);

router.post("/postman",createPersonPostman);

router.put("/:id",upDatePerson);

router.post("/",createPerson);

router.delete("/:id",deletePerson);

module.exports = router;
