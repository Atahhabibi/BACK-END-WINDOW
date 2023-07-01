let { people, products } = require("../data");

const getPeople = (req, res) => {
  res.status(200).send({ success: true, data: people });
};

const createPersonPostman = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }

  res.status(201).json({
    success: true,
    data: [...people, { id: new Date().getTime(), name: name }],
  });
};

const createPerson = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }

  res.status(201).json({ success: true, person: name });
};

const upDatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: "no person with this id" });
  }

  const tempPerson = products.map((item) => {
    if (item.id === Number(id)) {
      item.name = name;
    }

    return item;
  });

  res.status(200).json({ success: true, data: tempPerson });
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: "no person with this id" });
  }
  const tempPerson = products.filter((item) => {
    if (item.id !== Number(id)) {
      return item;
    }
  });

  res.status(201).json({ success: true, data: tempPerson });
};

module.exports = {
  createPerson,
  createPersonPostman,
  deletePerson,
  upDatePerson,
  getPeople
};
