const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { attachCookiesToResponse } = require("../utils");
const CustomError = require("../errors");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email Already exists");
  }

  const isFirstAccount = (await User.countDocuments({})) === 0;

  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    CustomError.BadRequestError("Please provide email or password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Unauthorized user");
  }

  const tokenUser = { name: user.name, userId: user._id, role: user.role };

  attachCookiesToResponse({ res: res, user: tokenUser });
  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({msg:"user logged out !"})
};

module.exports = {
  register,
  login,
  logout,
};
