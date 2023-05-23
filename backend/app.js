const express = require("express");
const morgan = require("morgan");
const app = express();
const mongodb = require("./config/db");
require("dotenv").config();

const userRouter = require("./routes/user.routes");
const recruiterRouter = require("./routes/recruiter.routes");
const jobRouter = require("./routes/job.routes");
const jobApplyRouter = require("./routes/jobApply.routes");

mongodb.mongoConnect();

app.use(express.json());

app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/recruiter", recruiterRouter);
app.use("/job", jobRouter);
app.use("/jobApply", jobApplyRouter);

module.exports = app;
