const errorHandler = require("express-async-handler");
const Donation = require("../Models/donation.model");
const User = require("../models/user.model");
const Request = require("../Models/request.model");

const getAllDonations = errorHandler(async (req, res) => {
  try {
    const donations = await Donation.find();
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ message: "Error fetching donations" });
  }
});

const getAllRequests = errorHandler(async (req, res) => {
  try {
    const requests = await Request.find();
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Error fetching requests" });
  }
});

const getAllUsers = errorHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
});

module.exports = {
  getAllDonations,
  getAllRequests,
  getAllUsers,
};
