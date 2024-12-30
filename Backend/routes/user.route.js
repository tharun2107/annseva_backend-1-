const express = require("express");
const router = express.Router();

const {
    register,
    login,
    // updateAvailability,
    // updateActiveReceiving,
    // updateUser,
    // getDonorLog,
    // getReceiverLog,
    // getVolunteerLog,
    // getProfile,
    SendOtp,
    verifyotp
} = require("../controllers/user.controller");

// // when volunteer updates his availability
// router.put("/volunteer", updateAvailability);

// // when receiver updates active-receiving
// router.put("/receiver", updateActiveReceiving);

// // profile update
// router.put("/", updateUser);

// logs or histories for each user
// router.get("/log/donor", getDonorLog);
// router.get("/log/receiver", getReceiverLog);
// router.get("/log/volunteer", getVolunteerLog);
// router.get("/profile", getProfile);
router.post("/register", register);
router.post("/login", login);
router.post("/sent-otp",SendOtp);
router.post("/verify-otp",verifyotp);

module.exports = router;