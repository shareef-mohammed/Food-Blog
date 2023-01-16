require("dotenv").config();

const validateAdminToken = async (req, res, next) => {
  if (req.headers["x-custom-header"]) {
    try {
      admin = req.headers["x-custom-header"];
      const decode = JWT.verify(admin, JWT_ADMIN_SECRET_KEY);

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

exports.validateAdminToken = validateAdminToken;
