const express = require("express");
const router = express.Router();
const {
  getActiveRequests,
  deleteRequest,
  postRequest
} = require("../controllers/request.controller");

// to display all the active requests and organizations to the donor
router.get("/", getActiveRequests);

// receiver making a request
router.post("/", postRequest);

// when receiver decides to stop a particular request.
// router.delete("/:id", deleteRequest);


module.exports = router;
