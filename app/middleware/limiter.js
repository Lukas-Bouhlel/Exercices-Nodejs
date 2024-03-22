const { rateLimit } = require("express-rate-limit");
// const { slowDown } = require('express-rate-limit')

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Vous avez atteint le nombre de request maximum (100) par heure, veuillez réessayer plus tard.",
});

// const speedLimiter = slowDown({
//   windowMs: 60 * 1000,
//   delayAfter: 30,
//   delayMs: 500,
// });

module.exports = { apiLimiter };