const postData = require("../models/postModel");
const userData = require("../models/userModel");
const likeData = require("../models/likeModel");
const commentData = require("../models/commentModel");
const reportData = require("../models/reportModel");
const mongoose = require("mongoose");

exports.addPost = async (req, res) => {
  try {
    const userId = req.params.id;

    const { foodName, desc, rating, url1, url2, resName, contact, address } =
      req.body;
    if (!foodName || !desc || !rating || !resName) {
      res.json({ status: "emptyErr" });
    }
    const post = new postData({
      userId,
      foodName,
      desc,
      rating,
      resName,
      contact,
      address,
      images: {
        url: url1,
      },
      resImage: {
        url: url2,
      },
      // location:{
      //     type:"Point",
      //     coordinates: [parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
      // }
    });
    await post.save();
    res.send(post);
  } catch (err) {
    console.log(err);
  }
};

exports.likePost = async (req, res) => {
  try {
    const user = req.body.userId;
    const userId = mongoose.Types.ObjectId(user);
    const post = req.params.id;
    const postId = mongoose.Types.ObjectId(post);

    const postLike = await likeData.findOne({
      $and: [{ userId: { $eq: userId } }, { postId: { $eq: postId } }],
    });

    if (postLike) {
      await likeData.findOneAndDelete({
        $and: [{ userId: { $eq: userId } }, { postId: { $eq: postId } }],
      });
      res.json({ status: false });
    } else {
      const likes = new likeData({
        userId,
        postId,
        like: true,
      });
      await likes.save();
      res.json({ status: true });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { userI, comment } = req.body;
    const userId = mongoose.Types.ObjectId(userI);
    const post = req.params.id;
    const postId = mongoose.Types.ObjectId(post);
    const isExist = await commentData.findOne({
      $and: [{ userId: { $eq: userId } }, { postId: { $eq: postId } }],
    });
    if (isExist) {
      const addToExist = await commentData.findOneAndUpdate(
        {
          $and: [{ userId: { $eq: userId } }, { postId: { $eq: postId } }],
        },
        { $push: { comment: comment } }
      );
      res.send(addToExist);
    } else {
      const comments = new commentData({
        userId,
        postId,
        comment,
      });
      await comments.save();
      res.send(comments);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.allPosts = async (req, res) => {
  try {
    let skip = req.query.skip ? Number(req.query.skip) : 0;
    let DEFAULT_LIMIT = 6;
    const q = req.query.q;

    const posts = await postData.aggregate([
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "details",
        },
      },
    ]);

    const keys = ["foodName", "resName"];

    const search = (data) => {
      return data.filter((item) => {
        return keys.some((key) => item[key].toLowerCase().includes(q));
      });
    };
    const data = search(posts).splice(skip, DEFAULT_LIMIT);

    res.json({ data });
  } catch (err) {
    console.log(err);
  }
};

exports.singlePost = async (req, res) => {
  try {
    const { id } = req.params;
    const postId = mongoose.Types.ObjectId(id);
    const post = await postData.aggregate([
      {
        $match: {
          _id: postId,
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "details",
        },
      },
    ]);
    res.json({ post });
  } catch (err) {
    console.log(err);
  }
};

exports.userPosts = async (req, res) => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 6;
    const user = req.headers["x-custom-header"];
    const username = await userData.findOne({ userName: user });
    const userEmail = await userData.findOne({ email: user });

    let userId;
    if (username) {
      userId = username._id;
    } else if (userEmail) {
      userId = userEmail._id;
    } else {
      userId = "";
    }

    if (userId) {
      const data = await postData
        .find({ userId })
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(DEFAULT_LIMIT);

      res.json({ data, userId });
    } else {
      console.log("err");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.homePosts = async (req, res) => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 6;
    const user = req.headers["x-custom-header"];
    const username = await userData.findOne({ userName: user });
    const userEmail = await userData.findOne({ email: user });

    let location;
    if (username) {
      location = username.location;
    } else if (userEmail) {
      location = userEmail.location;
    } else {
      location = "";
    }
  
    const data = await postData.aggregate([{
      $match: { address : location}
    },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "details",
        },
      },
    ]);
      
    res.json({ data });
  } catch (err) {
    console.log(err);
  }
};

exports.postComments = async (req, res) => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 10;
    const id = req.params.id;
    const postId = mongoose.Types.ObjectId(id);
    const data = await commentData.aggregate([
      {
        $match: {
          postId,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "details",
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: DEFAULT_LIMIT,
      },
    ]);

    res.json({ data });
  } catch (err) {
    console.log(err);
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postData.findById(id);
    res.json({ post });
  } catch (err) {
    console.log(err);
  }
};

exports.editPost = async (req, res) => {
  try {
    const { id } = req.params;

    await postData.findByIdAndUpdate(id, {
      ...req.body,
      images: {
        url: req.body.url1,
      },
      resImage: {
        url: req.body.url2,
      },
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await postData.findByIdAndDelete(id);
    await likeData.deleteMany({ postId: id });
    await commentData.deleteMany({ postId: id });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
};

exports.getLikeDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const postId = mongoose.Types.ObjectId(id);
    const user = req.headers["x-custom-header"];
    const userId = mongoose.Types.ObjectId(user);
    const likes = await likeData.find({
      userId,
      postId,
      like: true,
    });

    if (likes) {
      res.json({ likes });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.reportPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { postedUser, reportedUser, report } = req.body;
    
    if (!postId || !postedUser || !reportedUser) {
      return res.json({ status: "wrongErr" });
    }
    
    if (!report) {
      return res.json({ status: "inputErr" });
    }
    const data = new reportData({
      postId,
      userId: postedUser,
      reportedUser,
      report,
    });
    await data.save();
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
};

exports.locations = async(req,res) => {
  try {
    const location = await postData.aggregate([{
      $group: {
        _id: '$address',
      }
    }])
    res.json({location})
  } catch (err) {
    console.log(err)
  }
}

exports.categories = async(req,res) => {
  try {
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const DEFAULT_LIMIT = 10;
    const data = await postData.aggregate([{
      $group: {
        _id: '$foodName',
        url : {"$first": "$images.url"}
      }
    },{
      $skip: skip
    }, {
      $limit:DEFAULT_LIMIT
    }])

    
    res.json({data})
  } catch (err) {
    console.log(err)
  }
}

exports.singleCategory = async(req, res) => {
  try {
    let skip = req.query.skip ? Number(req.query.skip) : 0;
    let DEFAULT_LIMIT = 6;
    const q = req.query.q;
    const category = req.params.id
    const posts = await postData.aggregate([{
      $match: { foodName : category}
    },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "details",
        },
      },
    ]);

    const keys = ["foodName", "resName"];

    const search = (data) => {
      return data.filter((item) => {
        return keys.some((key) => item[key].toLowerCase().includes(q));
      });
    };
    const data = search(posts).splice(skip, DEFAULT_LIMIT);

    res.json({ data });
  } catch (err) {
    console.log(err)
  }
}

exports.filteredPosts = async(req, res) => {
  try {
    let skip = req.query.skip ? Number(req.query.skip) : 0;
    let DEFAULT_LIMIT = 8;
    const location = req.headers["x-custom-header"];
    const q = req.query.q
    const posts = await postData.aggregate([{
      $match: { address : location}
    },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "details",
        },
      },
    ]);

    const keys = ["foodName", "resName"];

    const search = (data) => {
      return data.filter((item) => {
        return keys.some((key) => item[key].toLowerCase().includes(q));
      });
    };
    const data = search(posts).splice(skip, DEFAULT_LIMIT);

    res.json({ data });
  } catch (err) {
    console.log(err)
  }
}