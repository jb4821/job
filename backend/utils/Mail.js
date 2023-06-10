const nodemailer = require("nodemailer");
require("dotenv").config();

const sendApplyJobMail = async (email, message) => {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Mail_USER,
        pass: process.env.Mail_PASSWORD,
      },
    });

    let mailDetails = {
      from: `TalentSpot <${process.env.Mail_USER}>`,
      to: email,
      subject: "TalentSpot - Job Applied",
      text: `${message}`,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log("Error Occurs");
        } else {
          console.log("Email sent successfully.");
        }
    })
}

const sendAcceptJobMail = async (email, message) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Mail_USER,
      pass: process.env.Mail_PASSWORD,
    },
  });

  let mailDetails = {
    from: `TalentSpot <${process.env.Mail_USER}>`,
    to: email,
    subject: "TalentSpot - Job Request Accepted by Recruiter",
    text: `${message}`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully.");
    }
  });
};

const sendRejectJobMail = async (email, message) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Mail_USER,
      pass: process.env.Mail_PASSWORD,
    },
  });

  let mailDetails = {
    from: `TalentSpot <${process.env.Mail_USER}>`,
    to: email,
    subject: "TalentSpot - Job Request Rejected by Recruiter",
    text: `${message}`,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs");
    } else {
      console.log("Email sent successfully.");
    }
  });
};

module.exports = {
    sendApplyJobMail,
    sendAcceptJobMail,
    sendRejectJobMail
}