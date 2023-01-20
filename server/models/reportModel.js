const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  userId: {
    type: String,
    required: true,
  },
  reportedUser: {
    type: String,
    required: true,
  },
  report: {
    type: String,
    required: true,
  },
},{timestamps: true});

module.exports = mongoose.model("Report", reportSchema);
