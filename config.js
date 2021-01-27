const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});
module.exports = transporter;
