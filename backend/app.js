const express = require("express");
const morgan = require("morgan");
const app = express();
const mongodb = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/user.routes");
const recruiterRouter = require("./routes/recruiter.routes");
const jobRouter = require("./routes/job.routes");
const jobApplyRouter = require("./routes/jobApply.routes");

mongodb.mongoConnect();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    Credential:true,
    
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(morgan("dev"));

app.use("/user", userRouter);
app.use("/recruiter", recruiterRouter);
app.use("/job", jobRouter);
app.use("/jobApply", jobApplyRouter);

module.exports = app;
