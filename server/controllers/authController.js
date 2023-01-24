require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const cookies = req.cookies;

  const { name, password } = req.body;
  if (!name || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const username = await User.findOne({ userName: name }).exec();
  const useremail = await User.findOne({ email: name }).exec();
  let foundUser;
  if (username) {
    foundUser = username;
  } else if (useremail) {
    foundUser = useremail;
  } else {
    foundUser = "";
  }

  if (!foundUser) return res.sendStatus(401);
  if (foundUser.isVerified === false) return res.sendStatus(402);
  if (foundUser.isBlocked === true) return res.sendStatus(403);
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          user: foundUser._id,
          type:"user"
        },
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "2d" }
    );

    const newRefreshToken = jwt.sign(
      {
        user: foundUser._id,
        type:"user"
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1000s" }
    );

    // Changed to let keyword
    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken }).exec();

      if (!foundToken) {
        newRefreshTokenArray = [];
      }

      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
    }

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } else {
    res.sendStatus(401).json({err:'catchErr'});
  }
};

module.exports = { handleLogin };
