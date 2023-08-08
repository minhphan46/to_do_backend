const Task = require("../models/task");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(StatusCodes.OK).json({ count: tasks.length, tasks });
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};

const getSingleTask = async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    throw new CustomError.NotFoundError(`No task with id : ${taskID}`);
  }

  res.status(StatusCodes.OK).json({ task });
};

const updateTask = async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    throw new CustomError.NotFoundError(`No task with id : ${taskID}`);
  }

  res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    throw new CustomError.NotFoundError(`No task with id : ${taskID}`);
  }

  await task.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Task removed." });
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
