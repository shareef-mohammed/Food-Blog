require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const adminData = require("../models/adminModel");
const userData = require("../models/userModel");
const postData = require("../models/postModel");
const bannerData = require("../models/bannerModel");
const reportData = require("../models/reportModel");

const { hashPassword, comparePassword } = require("../utils/helpers");

exports.adminLogin = async (req, res) => {
  try {
    const adminReg = await adminData.find({});
    if (adminReg.length == 0) {
      const hashedPassword = hashPassword(process.env.PASSWORD);
      const newAdmin = new adminData({
        name: process.env.NAME,
        email: process.env.EMAIL,
        password: hashedPassword,
      });
      await newAdmin.save();
    }

    const { email, password } = req.body;
    const admin = await adminData.findOne({ email });
    if (admin) {
      const isValid = comparePassword(password, admin.password);
      if (isValid) {
        const token = jwt.sign(
          {
            id: admin._id,
            name: admin.name,
            type: "admin",
          },
          process.env.JWT_ADMIN_SECRET_KEY
        );

        res.json({ token });
      } else {
        res.json({ status: "passErr" });
      }
    } else {
      res.json({ status: "emailErr" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.userDetails = async (req, res) => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 10;
    const q = req.query.q;

    const keys = ["userName", "fullName", "email"];

    const search = (data) => {
      return data.filter((item) => {
        return keys.some((key) => item[key].toLowerCase().includes(q));
      });
    };

    await userData.deleteMany({ isVerified: false });
    const users = await userData.find({});
    const data = search(users).splice(skip, DEFAULT_LIMIT);
    res.json({ data });
  } catch (err) {
    console.log(err);
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = mongoose.Types.ObjectId(id);
    await userData.findByIdAndUpdate({ _id: userId }, { isBlocked: true });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = mongoose.Types.ObjectId(id);
    await userData.findByIdAndUpdate({ _id: userId }, { isBlocked: false });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
};

exports.banners = async (req, res) => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 10;
    const data = await bannerData.find({}).sort({createdAt: -1}).skip(skip).limit(DEFAULT_LIMIT);
    res.json({ data });
  } catch (err) {
    console.log(err);
  }
};

exports.addBanner = async (req, res) => {
  try {
    const { foodName, resName, address, offer, code, url } = req.body;
    const newBanner = new bannerData({
      foodName,
      resName,
      offer,
      code,
      address,
      images: [
        {
          url,
        },
      ],
    });
    await newBanner.save();
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    await bannerData.findByIdAndDelete(id);
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
};

exports.getBanners = async (req, res) => {
  try {
    const banners = await bannerData.find({}).sort({ createdAt: -1 }).limit(3);

    res.json({ banners });
  } catch (err) {
    console.log(err);
  }
};

exports.getReports = async (req, res) => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 10;
    const data = await reportData.find({}).sort({createdAt: -1}).skip(skip).limit(DEFAULT_LIMIT);
    res.json({ data });
  } catch (err) {
    console.log(err);
  }
};

exports.postChartData = async (req, res) => {
  try {
    const data = await postData.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
            day: {
              $dayOfMonth: "$createdAt",
            },
          },

          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $project: {
          date: "$_id.day",

          count: 1,
          _id: 0,
        },
      },
      {
        $limit: 7,
      },
    ]);
    const users = await userData.aggregate([
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
            day: {
              $dayOfMonth: "$createdAt",
            },
          },

          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $project: {
          date: "$_id.day",

          count: 1,
          _id: 0,
        },
      },
      {
        $limit: 7,
      },
    ]);

    res.json({ data, users });
  } catch (err) {
    console.log(err);
  }
};

exports.userCounts = async (req, res) => {
  try {
    const count = await userData
      .find({ createdAt: { $gt: Date.now() - 30 * 24 * 60 * 60 * 1000 } })
      .count();
    const totCount = await userData.find({}).count();
    res.json({ count, totCount });
  } catch (err) {
    console.log(err);
  }
};

exports.removeReport = async(req, res) => {
  try {
    const {id} = req.params;
    await reportData.findByIdAndDelete(id);
    res.json({status:'ok'});
  } catch (err) {
    console.log(err)
  }
}

exports.adminDetails = async(req,res) => {
  try {
    const adminToken = req.headers["x-custom-header"];
    const decode = jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET_KEY)
    if(decode.type == 'admin') {
      const admin = await adminData.findById({_id: decode.id})
      if(admin) {
        res.json({status:'ok'})
      } else {
        res.json({status:'err'})
      }
    } else {
      res.json({status:'err'})
    }

  } catch (err) {
    console.log(err);
  }
}