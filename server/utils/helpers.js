const bcrypt = require("bcrypt");

function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

function comparePassword(raw, hash) {
  return bcrypt.compareSync(raw, hash);
}

function hashOTP(OTP) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(OTP, salt);
}

function compareOTP(raw, hash) {
  return bcrypt.compareSync(raw, hash);
}

module.exports = {
  hashPassword,
  comparePassword,
  hashOTP,
  compareOTP,
};
