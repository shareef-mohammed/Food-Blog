require("dotenv").config();
const JWT = require('jsonwebtoken')

const validateAdminToken = async (req, res, next) => {
  
  if (req.headers["x-custom-header"]) {
    
    try {
      const admin = req.headers["x-custom-header"];
      const decode = JWT.verify(admin, process.env.JWT_ADMIN_SECRET_KEY);
      
      const type = decode.type;
      if (type === "admin") {
        next();
      }
    } catch (err) {
      return res.status(200).send({ errormsg: "authentication failed" });
    }
  } else {
    return res.status(200).send({ errormsg: "authentication failed" });
  }
};

const validateUserToken = async (req, res, next) => {
  
  if (req.headers["x-custom-header"]) {
    
    try {
      const user = req.headers["x-custom-header"];
      const decode = JWT.verify(user,process.env.JWT_SECRET_KEY);
      // check blocked or not
      req.user = decode.UserInfo.user
      const type = decode.UserInfo.type;
      if (req.user && type === "user") {
        next();
      }
    } catch (err) {
      
      return res.status(200).send({ errormsg: "authentication failed" });
    }
  } else {
    return res.status(200).send({ errormsg: "authentication failed" });
  }
};

exports.validateAdminToken = validateAdminToken;

exports.validateUserToken = validateUserToken;
