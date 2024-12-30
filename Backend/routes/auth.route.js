// const express = require("express");
// const {
//   SendOtp,
//   verifyotp,
//   login,
//   register
// } = require("../controllers/auth.controller");
// const router = express.Router();

// // Admin Routes
// router.post("/login", login);
// router.post("/register", register);
// router.post("/sent-otp", SendOtp);
// router.post("/verify-otp",verifyotp)

// module.exports = router;



const express = require('express');
const {
  sendOtpHandler,
  verifyOtpHandler,
  registerHandler,
  loginHandler,
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', registerHandler);
router.post('/login', loginHandler);
router.post('/send-otp', sendOtpHandler);
router.post('/verify-otp', verifyOtpHandler);

module.exports = router;
