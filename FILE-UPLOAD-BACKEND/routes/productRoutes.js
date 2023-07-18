const express = require("express");
const { uploadProductImage } = require("../controllers/uploadsController");
const {
  createProduct,
  getAllProduct,
} = require("../controllers/productController");
const router = express.Router();

router.route("/").post(createProduct).get(getAllProduct);
router.route('/uploads').post(uploadProductImage);


module.exports=router;