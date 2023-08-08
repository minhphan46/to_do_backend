require("dotenv").config();
require("express-async-errors"); //  khong can try catch err

const express = require("express");
const app = express();
const taskRouter = require("./routes/taskRouter");

// limit request
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

// database
const connectDB = require("./db/connect");
// error handler
const notFound = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/error-handler");

// server security
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 60,
  })
);
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(mongoSanitize());

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
