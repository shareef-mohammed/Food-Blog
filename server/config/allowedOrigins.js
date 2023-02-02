
const allowedOrigins = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  process.env.BACK_END,
  process.env.FRONT_END,
];

module.exports = allowedOrigins;
