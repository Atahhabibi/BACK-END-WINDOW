const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const notFound = require("../middleware/not-found");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select('-password');
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id }).select('-password');

  if (!user) {
    throw new notFound(`No user with id: ${req.params.id}`);
  }

  res.status(StatusCodes.OK).json({ user });
};




const showCurrentUser = async (req, res) => {
  res.send("<h1>CURRENT USER</h1>");
};

const updateUser = async (req, res) => {
  console.log(req.body);
  res.send("<h1>UPDATE USERS</h1>");
};

const updateUserPassword = async (req, res) => {
  res.send("<h1>UPDATE PASSWORD</h1>");
};

module.exports = {
  updateUser,
  updateUserPassword,
  showCurrentUser,
  getAllUsers,
  getSingleUser,
};
