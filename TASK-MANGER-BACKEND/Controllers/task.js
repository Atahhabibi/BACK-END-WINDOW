const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });

  if (!task) {
    return next(
      createCustomError(`NO Task with this id:  ${req.params.id}`, 404)
    );
  }

  res.status(200).json(task);
});

const updateTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(
      createCustomError(`NO Task with this id:  ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findByIdAndDelete({ _id: req.params.id });
  if (!task) {
    return next(
      createCustomError(`NO Task with this id:  ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ msg: "Deleted successfully ", task: task });
});

module.exports = {
  getAllTasks,
  updateTask,
  deleteTask,
  getTask,
  createTask,
};
