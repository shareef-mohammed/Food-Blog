require("dotenv").config();
const userData = require("../models/userModel");
const userOTPData = require("../models/OTPModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const {
  hashPassword,
  comparePassword,
  hashOTP,
  compareOTP,
} = require("../utils/helpers");

const { sendOTPVerificationMail } = require("../utils/otpMailer");

exports.homePage = async (req, res) => {
  try {
    res.status(200).send("home page");
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.register = async (req, res) => {
  try {
    const { userName, fullName, email, phone, password } = req.body;
    const regx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!userName || !fullName || !email || !phone || !password) {
      return res.json({ status: "err" });
    } else if (userName.length < 6) {
      return res.json({ status: "err" });
    } else if (!email.match(regx)) {
      return res.json({ status: "err" });
    } else if (phone.length !== 10 || isNaN(phone)) {
      return res.json({ status: "err" });
    } else if (password.length < 6 || password.length > 15) {
      return res.json({ status: "err" });
    }
    const userna = await userData.findOne({ userName });

    if (userna) {
      if (userna.isVerified == false) {
        await userData.findOneAndDelete({ userName });
        await userOTPData.deleteMany({ userEmail: userna.email });
      }
    }
    const usermail = await userData.findOne({ email });
    if (usermail) {
      if (usermail.isVerified == false) {
        await userData.findOneAndDelete({ email });
        await userOTPData.deleteMany({ userEmail: usermail.email });
      }
    }

    const username = await userData.findOne({ userName });
    if (!username) {
      const userEmail = await userData.findOne({ email });
      if (!userEmail) {
        const hashedPassword = hashPassword(password);
        const user = await userData.create({
          userName,
          fullName,
          email,
          phone,
          password: hashedPassword,
        });
        user.save().then((data) => {
          sendOTPVerificationMail(data, req, res);
        });
      } else {
        res.status(200).json({ status: "emailExist" });
      }
    } else {
      res.status(200).json({ status: "userExist" });
    }
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.otpVerify = async (req, res) => {
  try {
    let { otp, email } = req.body;

    if (req.body.input) {
      email = req.body.input;
      
    }
    

    const userOtp = await userOTPData.findOne({ userEmail: email });

    if (Date.now() < userOtp.expiresAt) {
      const isValid = compareOTP(otp, userOtp.otp);
      if (isValid) {
        await userData.findOneAndUpdate({ email }, { isVerified: true });
        await userOTPData.findOneAndDelete({ userEmail: email });
        const user = await userData.findOne({ email });
        res.status(200).json({ user });
      } else {
        res.status(200).json({ status: "invalid" });
      }
    } else {
      await userOTPData.deleteMany({ userEmail: email });
      await userData.findOneAndDelete({ email });
      res.status(200).json({ status: "expired" });
    }
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userData.findOne({ email });
    const userId = user._id;
    await userOTPData.deleteMany({ userEmail: email });
    sendOTPVerificationMail({ _id: userId, email }, req, res);
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userData.findOne({ email });
    if (user) {
      const userId = user._id;
      sendOTPVerificationMail({ _id: userId, email }, req, res);
    } else {
      res.status(200).json({ status: "notFound" });
    }
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);
    await userData.findOneAndUpdate({ email }, { password: hashedPassword });
    res.status(200).send({ status: "ok" });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.addProfilePic = async (req, res) => {
  try {
    const { id, url } = req.body;
    const user = await userData.findByIdAndUpdate(id, { url: url });
    res.status(200).send(user);
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { input, fullName, userName, phone, email } = req.body;
    const { id } = req.params;
    if (input || email) {
      if (userName) {
        const user = await userData.findOne({ userName: input });
        if (!user) {
          await userData.findByIdAndUpdate(id, { userName: input });
          res.status(200).json({ status: "ok" });
        } else {
          res.status(200).json({ status: "err" });
        }
      } else if (fullName) {
        if (input.length > 6) {
          await userData.findByIdAndUpdate(id, { fullName: input });
          res.status(200).json({ status: "ok" });
        } else {
          res.status(200).json({ status: "err" });
        }
      } else if (email) {
        const user = await userData.findOne({ email: input });
        if (!user) {
          await userData.findByIdAndUpdate(id, { email: input });
          res.status(200).json({ status: "ok" });
        } else {
          res.status(200).json({ status: "err" });
        }
      } else if (phone) {
        if (!input.length == 10 || !isNaN(input)) {
          await userData.findByIdAndUpdate(id, { phone: input });
          res.status(200).json({ status: "ok" });
        } else {
          res.status(200).json({ status: "err" });
        }
      } else {
        res.status(200).json({ status: "error" });
      }
    }
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.userDetails = async (req, res) => {
  try {
    
    if (req.params.id) {
      const user = req.params.id;
      const username = await userData.findOne({ userName: user });
      const userEmail = await userData.findOne({ email: user });

      let id;
      if (username) {
        id = username._id;
        username.password = null
      } else if (userEmail) {
        id = userEmail._id;
        userEmail.password = null
      } else {
        id = "";
      }

      if (id) {
        const details = await userData.findById(id);

        res.status(200).json({ details });
      } else {
        res.status(200).json({ status: false });
      }
    } else {
      res.status(200).json({ status: false });
    }
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.resetEmail = async (req, res) => {
  try {
    const email = req.body.input;
    const _id = req.body.id;
    sendOTPVerificationMail({ _id, email }, req, res);
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.uploadPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const url = req.body.url;
    await userData.findByIdAndUpdate(id, { profilePic: url });
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.updateBio = async (req, res) => {
  try {
    const { id } = req.params;
    const bio = req.body.bio;
    await userData.findByIdAndUpdate(id, { bio: bio });
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    await userData.findByIdAndUpdate(id, { profilePic: "" });
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.followUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userI = req.body.userId;
    const userId = mongoose.Types.ObjectId(userI);
    const exist = await userData.findById(id);
    if (!exist.followers.includes(userId)) {
      await userData.findByIdAndUpdate(id, { $push: { followers: userId } });
      res.status(200).json({ status: "ok" });
    } else {
      await userData.findByIdAndUpdate(id, { $pull: { followers: userId } });
      res.status(200).json({ status: "ok" });
    }
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.followersDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const followI = req.headers["x-custom-header"];
    const followId = mongoose.Types.ObjectId(followI);
    const exist = await userData.findOne({ _id: followId });
    const user = await userData.findById({ _id: followId });
    const count = user.followers.length;

    if (exist.followers.includes(userId)) {
      res.status(200).json({ status: true, count });
    } else {
      res.status(200).json({ status: false, count });
    }
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.followers = async (req, res) => {
  try {
    const user = req.params.id
    const username = await userData.findOne({ userName: user });
    const userEmail = await userData.findOne({ email: user });

    let id;
    if (username) {
      id = username._id;
    } else if (userEmail) {
      id = userEmail._id;
    } else {
      id = "";
    }

    const count = await userData.aggregate([
      {
        $match: { _id: id },
      },
      {
        $project: {
          totFollowers: {
            $size: "$followers",
          },
          _id: 0,
        },
      },
    ]);

    const followers = await userData.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers",
          foreignField: "_id",
          as: "followers",
        },
      },
      {
        $project: {
          followers: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json({ count, followers });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.isLocated = async (req, res) => {
  try {
    const user = req.headers["x-custom-header"];
    const username = await userData.findOne({ userName: user });
    const userEmail = await userData.findOne({ email: user });
    
    if(username ) {
      if (username.location === null ) {
        res.status(200).json({ status: false });
      } else {
        res.status(200).json({ status: true });
      }
    } else {
      if( userEmail.location === null) {
        res.status(200).json({ status: false });
      } else {
        res.status(200).json({ status: true });
      }
    }
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.setLocality = async(req,res) => {
  try {
    const {id, place} = req.body;
    await userData.findByIdAndUpdate(id, {location: place});
    res.status(200).json({status:true})
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
}