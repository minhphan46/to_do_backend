require("dotenv").config();
require("express-async-errors"); //  khong can try catch err

const express = require("express");
const app = express();
const taskRouter = require("./routes/taskRouter");
// database
const connectDB = require("./db/connect");
// error handler
const notFound = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/error-handler");
// middleware
app.use(express.json());

// routers
app.use("/api/v1/tasks", taskRouter);

app.use(notFound);
app.use(errorHandleMiddleware);

// start server
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    // connect to database
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
