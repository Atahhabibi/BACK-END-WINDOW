const { StatusCodes } = require("http-status-codes");
const path = require("path");
const { BadRequestError } = require("../errors");
const notFound = require("../middleware/not-found");
const Product = require("../models/Product");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId }).populate('reviews');

  if (!product) {
    throw new notFound(`No product found with id: ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new notFound(`No product found with id: ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new notFound(`No product found with id: ${productId}`);
  }

  await product.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Product Removed" });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No File Uploaded");
  }

  const productImage = req.files.image;

  console.log(productImage);

  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("please Upload Image");
  }

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new BadRequestError("please Upload Image smaller than 1MB");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  uploadImage,
  getSingleProduct,
};
