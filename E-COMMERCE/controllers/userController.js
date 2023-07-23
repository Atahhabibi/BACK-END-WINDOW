const { StatusCodes, UNAUTHORIZED } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const notFound = require("../middleware/not-found");
const User = require("../models/User");
const { attachCookiesToResponse, createTokenUser, checkPermissions } = require("../utils");

const getAllUsers = async (req, res) => {
  console.log(req.user);
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id }).select("-password");

  if (!user) {
    throw new notFound(`No user with id: ${req.params.id}`);
  }

  checkPermissions(req.user,user._id);

  res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

//update user with findOneandUpdate()

// const updateUser = async (req, res) => {
//   const { name, email } = req.body;

//   if (!name || !email) {
//     throw new CustomError.BadRequestError("Please provide all values");
//   }

//   const user = await User.findOneAndUpdate(
//     { _id: req.user.userId },
//     { email, name },
//     { new: true, runValidators: true }
//   );

//   const tokenUser = createTokenUser(user);
//   attachCookiesToResponse({ res, user: tokenUser });

//   res.status(StatusCodes.OK).json({user:tokenUser});
// };





const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new CustomError.BadRequestError("Please provide all values");
  }

  const user=await User.findOne({_id:req.user.userId});

  user.email=email;
  user.name=name;

  await user.save();


  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({user:tokenUser});
};

const updateUserPassword = async (req, res) => {
  const { userId } = req.user;

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide both values");
  }

  const user = await User.findOne({ _id: userId });

  const isPasswordCorrect = user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  user.password = newPassword;

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Success! Password updated !!" });
};

module.exports = {
  updateUser,
  updateUserPassword,
  showCurrentUser,
  getAllUsers,
  getSingleUser,
};
