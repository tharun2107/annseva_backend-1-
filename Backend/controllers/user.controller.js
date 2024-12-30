// const User = require("../models/user.model");
// const Donation = require("../models/donation.model");

// const updateAvailability = async (req, res) => {
//   const { active } = req.body;
//   const user = await User.findById(req.user._id);
//   try {
//     if (user.role !== "volunteer") {
//       res.status(403).json({ msg: "Irrelevant functionality used" });
//     }

//     user.isActive = active;
//     const updatedUser = await user.save();
//     res
//       .status(200)
//       .json({ msg: "Updated availability successfully", updatedUser });
//   } catch (error) {
//     res.status(400).json({ msg: "Failed to update status", error });
//   }
// };

// const updateActiveReceiving = async (req, res) => {};

// const updateUser = async (req, res) => {
//   const { name, phone, location } = req.body;
//   try {
//     if (!name && !phone && !location) {
//       return res.status(401).json({ msg: "No changes provided for updation" });
//     }

//     const user = await User.findById(req.user._id);
//     if (!!name) {
//       user.name = name;
//     }
//     if (!!phone) {
//       user.phone = phone;
//       // phone validation
//       // **************************
//       // ***
//       // ***          CODE
//       // ***
//       // **************************
//     }
//     if (!!location) {
//       user.location = location;
//     }

//     const updatedUser = await user.save();
//     res.status(200).json({ msg: "User successfully updated", updatedUser });
//   } catch (error) {
//     return res
//       .status(400)
//       .json({ msg: "Failed to update user details", error });
//   }
// };

// const getDonorLog = async (req, res) => {
//   const userId = req.user._id;
//   try {
//     const user = await User.findById(userId);
//     const currentDonations = await Donation.find({
//       donorId: user._id,
//       status: { $ne: "completed" },
//     });

//     const completedDonations = await Donation.find({
//       donorId: user._id,
//       status: "completed",
//     });

//     res.status(200).json({
//       msg: "Retrieved logs successfully",
//       currentDonations,
//       completedDonations,
//     });
//   } catch (error) {
//     res.status(500).json({ msg: "Failed to fetch donor history", error });
//   }
// };

// const getReceiverLog = async (req, res) => {
//   const userId = req.user._id;
//   try {
//     const user = await User.findById(userId);
//     const currentRequests = await Request.find({
//       receiverId: user._id,
//     });

//     const currentDonations = await Donation.find({
//       receiverId: user._id,
//       status: { $ne: "completed" },
//     });

//     const completedDonations = await Donation.find({
//       receiverId: user._id,
//       status: "completed",
//     });

//     res.status(200).json({
//       msg: "Retrieved logs successfully",
//       currentRequests,
//       currentDonations,
//       completedDonations,
//     });
//   } catch (error) {
//     res.status(500).json({ msg: "Failed to fetch donor history", error });
//   }
// };

// const getVolunteerLog = async (req, res) => {
//   const userId = req.user._id;
//   try {
//     const user = await User.findById(userId);
//     const donations = await Donation.find({
//       needVolunteer: true,
//       volunteerId: user._id,
//     });

//     res.status(200).json({
//       msg: "Retrieved logs successfully",
//       donations,
//     });
//   } catch (error) {
//     res.status(500).json({ msg: "Failed to fetch donor history", error });
//   }
// };

// const getProfile = async (req, res) => {
//   const userId = req.user._id;
//   try {
//     const user = await User.findById(userId);

//     // Constructing the abstract user object
//     const abstractUser = {
//       name: user.name,
//       phone: user.phone,
//       location: { ...user.location }, // Create a shallow copy for location
//     };

//     // Sending the response
//     res.status(200).json({
//       msg: "Retrieved user details successfully",
//       user: abstractUser, // No need for spread operator here
//     });
//   } catch (error) {
//     res.status(500).json({ msg: "Failed to retrieve user details", error });
//   }
// };

// module.exports = {
//   updateAvailability,
//   updateActiveReceiving,
//   updateUser,
//   getDonorLog,
//   getReceiverLog,
//   getVolunteerLog,
//   getProfile,
// };


// BACKEND
// User Controller
require('dotenv').config();
const express = require('express');
const unirest = require('unirest');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = express.Router();
 
const User = require('../models/user.model');
const  FAST2SMS_API_KEY= process.env.FAST_SMS_API_KEY;
 

// Dummy database to store OTPs
const otpStore = {};
const users = [];

// Fast2SMS API Key
// const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY;
console.log(FAST2SMS_API_KEY);
// Utility to send OTP using Fast2SMS
function sendOtp(phoneNumber, otp) {
    return new Promise((resolve, reject) => {
        const req = unirest('GET', 'https://www.fast2sms.com/dev/bulkV2');
        req.query({
            authorization: FAST2SMS_API_KEY,
            variables_values: otp,
            route: 'otp',
            numbers: phoneNumber
        });
        req.headers({ 'cache-control': 'no-cache' });
        console.log(req);

        req.end(function (res) {
            if (res.error) {
                reject(res.error);
            } else {
                resolve(res.body);
            }
        });
    });
}

// Route to send OTP
const SendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
 console.log(phoneNumber);
    if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' });
    }
console.log(phoneNumber);
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[phoneNumber] = otp;
console.log(otp);
    try {
      const response = await sendOtp(phoneNumber, otp);
      console.log(response);
        res.status(200).json({ message: 'OTP sent successfully', response });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send OTP', error });
    }
};

// Route to verify OTP
const verifyotp = async (req, res) => {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
        return res.status(400).json({ message: 'Phone number and OTP are required' });
    }

    if (otpStore[phoneNumber] === otp) {
        delete otpStore[phoneNumber]; // Clear OTP after verification
        const token = jwt.sign({ phoneNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'OTP verified successfully', token });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
};

// Route to register user
const register = async (req, res) => {
  const { name, phone, location, email, role } = req.body;
  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ msg: "Phone number already registered" });
    }

    const user = new User({
      name,
      phone,
      location,
      email,
      role,
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({ msg: "User registered successfully", token, user });
  } catch (error) {
    res.status(500).json({ msg: "Failed to register user", error });
  }
};

// Login User
const login = async (req, res) => {
  const { phone } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ msg: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ msg: "Failed to login", error });
  }
};

module.exports = {
  SendOtp,
  verifyotp,
  register,
  login,
};
