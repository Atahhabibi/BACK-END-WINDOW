const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const CustomError = require("../errors");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email Already exists");
  }

  const isFirstAccount=await User.countDocuments({})===0;

  const role=isFirstAccount?"admin":"user";


  const user = await User.create({ name, email, password,role });

  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("<h1>LOGIN</h1>");
};
const logout = async (req, res) => {
  res.send("<h1>LOGOUT</h1>");
};

module.exports = {
  register,
  login,
  logout,
};
