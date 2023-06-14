const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

aws.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const imgFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const s3 = new aws.S3();

const imgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "jobportalbucket1",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `userprof-${Date.now()}`);
    },
  }),
  fileFilter: imgFilter,
});

const fileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "jobportalbucket1",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `userresume-${Date.now()}`);
    },
  }),
  fileFilter: fileFilter,
});

module.exports = {
  imgUpload,
  fileUpload,
};


