const express = require("express");
const router = express.Router();
require('dotenv').config();

const {
  getAllTasks,
  updateTask,
  deleteTask,
  getTask,
  createTask,
  editTask,
} = require("../Controllers/task");

router.route("/").get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).delete(deleteTask).patch(updateTask)


module.exports = router;
