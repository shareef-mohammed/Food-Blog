require("dotenv").config();
const userOTPData = require("../models/OTPModel");

const nodemailer = require("nodemailer");
const { hashOTP, compareOTP } = require("./helpers");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

const sendOTPVerificationMail = async ({ _id, email }, req, res) => {
  try {
    
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "verify your email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the sign up </p><p> This code <b> Expires in 2 Minutes</b>.</p>`,
    };

    await userOTPData.deleteMany({ userId: _id });
    const hashedOTP = hashOTP(otp);
    const newOTPVerification = new userOTPData({
      userId: _id,
      userEmail: email,
      otp: hashedOTP,
      expiresAt: Date.now() + 120000,
    });
    await newOTPVerification.save();
    await transporter.sendMail(mailOptions);
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(401)
  }
};

module.exports = {
  sendOTPVerificationMail,
};
