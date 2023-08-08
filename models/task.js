const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    maxlength: [100, "name can not be more than 100 characters"],
  },
  done: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);
