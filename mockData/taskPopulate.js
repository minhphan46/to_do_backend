// them data vao db tu dong
// node ./mockData/taskPopulate
require("dotenv").config();

const connectDB = require("../db/connect");

const Task = require("../models/task");

const jsonTasks = require("./tasks.json");

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    // xoa het ra khoi db
    await Task.deleteMany();
    // them moi lai
    await Task.create(jsonTasks);

    console.log("SUCCES!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
