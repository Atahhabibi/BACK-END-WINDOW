const express = require("express");
let { people, products } = require("../data");

const {
  createPerson,
  createPersonPostman,
  deletePerson,
  upDatePerson,
  getPeople,
} = require("../Controllers/people");

const router = express.Router();

// router.get("/", getPeople);

// router.post("/postman",createPersonPostman);

// router.put("/:id",upDatePerson);

// router.post("/",createPerson);

// router.delete("/:id",deletePerson);

router.route("/").get(getPeople).post(createPerson);
router.route("/postman").post(createPersonPostman);
router.route("/:id").delete(deletePerson).put(upDatePerson);

module.exports = router;
