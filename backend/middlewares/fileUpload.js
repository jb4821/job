const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
require("dotenv").config();

// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESSKEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "middlewares");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("profileImg");


// const uploadFile = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "middlewares");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + "-" + Date.now() + ".pdf");
//     },
//   }),
// }).single("cvFile");

module.exports = upload;
 

