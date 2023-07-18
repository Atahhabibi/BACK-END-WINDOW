const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {

  
  const single_product = await Product.create(req.body);
  console.log(single_product);
  res.status(StatusCodes.CREATED).json({ single_product });
};

const getAllProduct = async (req, res) => {
 const products=await Product.find({});
 res.status(StatusCodes.OK).json({products})
};

module.exports = {
  createProduct,
  getAllProduct,
};
