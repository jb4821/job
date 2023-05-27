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
    return cb("Please upload image only", false);
  }
};

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword"
  ) {
    cb(null, true);
  } else {
    return cb("Please upload pdf/doc only", false);
  }
};

const s3 = new aws.S3();

const imgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "jobportalbucket1",
    acl: "public-read",
    metaData: function (req, file, cb) {
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
    metaData: function (req, file, cb) {
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

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "middlewares");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + "-" + Date.now() + ".jpg");
//     },
//   }),
// }).single("profileImg");

// const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: "jobportalbucket1",
//     metadata: (req, file, cb) => {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: (req, file, cb) => {
//       const ext = path.extname(file.originalname);
//       cb(null, `${Date.now()}${ext}`);
//     },
//   }),
// });
