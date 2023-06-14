const nodemailer = require("nodemailer");
require("dotenv").config();

//reset password mail

const sendMail = async(email,message) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.Mail_USER,
      pass: process.env.Mail_PASSWORD,
    }
  })

  let mailDetails = {
    from: `TalentSpot <${process.env.Mail_USER}>`,
    to: email,
    subject: "TalentSpot - Reset Password",
    text: `${message} This link is valid for only 10 minutes and Please don't share this mail with anyone.`,
  };

  mailTransporter.sendMail(mailDetails, function (err,data) {
    if(err) {
      console.log("Error Occures");
    }else {
      console.log("Email sent successfully.");
    }
  })
}

//job apply mail

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

// accepted mail

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

//rejected mail

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
  sendMail,
    sendApplyJobMail,
    sendAcceptJobMail,
    sendRejectJobMail
}