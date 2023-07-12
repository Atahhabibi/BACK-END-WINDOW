const jwt = require("jsonwebtoken");
const { BadRequest } = require("../errors");
require("dotenv").config();

const login = async (req, res) => {
  const { password, username } = req.body;

  if (!password || !username) {
    throw new BadRequest("Please provide email and password");
  }

  const id = new Date().getDate();

  //try to keep payload small ,better experience for user
  //just for demo in production use long,complex and unguessable string value !!!!!

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Salam,${req.user.username} `,
    secret: `Here is your authorized data , your Lucky number is ${luckyNumber}`
  });


};

module.exports = {
  login,
  dashboard
};
