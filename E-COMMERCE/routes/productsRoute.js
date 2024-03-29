const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  uploadImage,
  getSingleProduct,
} = require("../controllers/productController");
const { getSingleProductReviews } = require("../controllers/reviewController");
const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authentication");


router
  .route("/")
  .post([authenticateUser, authorizePermission("admin")], createProduct)
  .get(getAllProducts);
router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermission("admin")], uploadImage);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermission("admin")], updateProduct)
  .delete([authenticateUser, authorizePermission("admin")], deleteProduct);

router.route('/:id/reviews').get(getSingleProductReviews)

module.exports = router;
