const express = require("express");
const router = express.Router();

const {
  updateUser,
  updateUserPassword,
  showCurrentUser,
  getAllUsers,
  getSingleUser,
} = require("../controllers/userController");
const {
  authenticateUser,
  authorizePermission,
} = require("../middleware/authentication");

router
  .route("/")
  .get(authenticateUser, authorizePermission("admin", "owner"), getAllUsers);
router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").patch(updateUser);
router.route("/updateUserPassword").patch(updateUserPassword);
router.route("/:id").get(authenticateUser, getSingleUser);

module.exports = router;
