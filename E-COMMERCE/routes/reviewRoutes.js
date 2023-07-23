const express = require("express");
const router = express.Router();

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { authenticateUser } = require("../middleware/authentication");

router.route("/").get(getAllReviews).post(authenticateUser,createReview);

router
  .route("/:id")
  .patch(authenticateUser,updateReview)
  .delete(authenticateUser,deleteReview)
  .get(getSingleReview);

module.exports = router;