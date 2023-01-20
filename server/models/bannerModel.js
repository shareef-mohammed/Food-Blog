const mongoose = require("mongoose");

const bannerSchema = mongoose.Schema(
  {
    foodName: {
      type: String,
      required: true,
    },
    resName: {
      type: String,
      required: true,
    },
    offer: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    code:{
      type:String,
      
    },
    images: [
      {
        url: String,
      },
    ],
    expiresAt: {
      type: Date,
      default: Date.now() + 7 * 24 * 60 * 60 * 1000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);
