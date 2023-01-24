require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const adminData = require("../models/adminModel");
const userData = require("../models/userModel");
const postData = require("../models/postModel");
const locationData = require("../models/locationModel");
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

        res.status(200).json({ token });
      } else {
        res.status(200).json({ status: "passErr" });
      }
    } else {
      res.status(200).json({ status: "emailErr" });
    }
  } catch (err) {
    res.status(401).json({status:'catchErr'})
  }
};

exports.userDetails = async (req, res) => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 20;
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
    res.status(200).json({ data });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = mongoose.Types.ObjectId(id);
    await userData.findByIdAndUpdate({ _id: userId }, { isBlocked: true });
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = mongoose.Types.ObjectId(id);
    await userData.findByIdAndUpdate({ _id: userId }, { isBlocked: false });
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.banners = async (req, res) => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 10;
    const data = await bannerData
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(DEFAULT_LIMIT);
    res.status(200).json({ data });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
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
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    await bannerData.findByIdAndDelete(id);
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.getBanners = async (req, res) => {
  try {
    const banners = await bannerData.find({}).sort({ createdAt: -1 }).limit(3);

    res.status(200).json({ banners });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.getReports = async (req, res) => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 10;
    const data = await reportData
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(DEFAULT_LIMIT);
    res.status(200).json({ data });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.postChartData = async (req, res) => {
  try {
    const data = await postData.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%m/%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $project: {
          count: 1,
          _id: 1,
        },
      },
      {
        $limit: 7,
      },
    ]);
    const users = await userData.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%m/%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $project: {
          count: 1,
          _id: 1,
        },
      },
      {
        $limit: 7,
      },
    ]);

    res.status(200).json({ data, users });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.userCounts = async (req, res) => {
  try {
    const count = await userData
      .find({ createdAt: { $gt: Date.now() - 30 * 24 * 60 * 60 * 1000 } })
      .count();
    const totCount = await userData.find({}).count();
    res.status(200).json({ count, totCount });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.removeReport = async (req, res) => {
  try {
    const { id } = req.params;
    await reportData.findByIdAndDelete(id);
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.adminDetails = async (req, res) => {
  try {
    const adminToken = req.headers["x-custom-header"];
    const decode = jwt.verify(adminToken, process.env.JWT_ADMIN_SECRET_KEY);
    if (decode.type == "admin") {
      const admin = await adminData.findById({ _id: decode.id });
      if (admin) {
        res.status(200).json({ status: "ok" });
      } else {
        res.status(200).json({ status: "err" });
      }
    } else {
      res.status(200).json({ status: "err" });
    }
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.locations = async (req, res) => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 20;
    const data = await locationData
      .find({})
      .sort({ name: 1 })
      .skip(skip)
      .limit(DEFAULT_LIMIT);

    res.status(200).json({ data });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.addLocation = async (req, res) => {
  try {
    const { name } = req.body;
    const exist = await locationData.findOne({ name });
    if (exist) {
      return res.status(200).json({ status: "existErr" });
    }
    const location = new locationData({
      name,
    });
    await location.save();
    res.status(200).json({ status: true });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};

exports.removeLocation = async (req, res) => {
  try {
    const { id } = req.params;
    await locationData.findByIdAndDelete(id);
    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.status(401).json({err:'catchErr'})
  }
};
