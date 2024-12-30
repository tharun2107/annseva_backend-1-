const Request = require("../Models/request.model");

const postRequest = async (req, res) => {
  const { quantity } = req.body;
  console.log(req.body);

  try {
    const newRequest = new Request({
      receiverId: req.user._id,
      quantity,
    });

    const savedRequest = await newRequest.save();
    res
      .status(201)
      .json({ msg: "Request added successfully", request: savedRequest });
  } catch (error) {
    res.status(400).json({ msg: "Error creating request", error });
  }
};

const getActiveRequests = async (req, res) => {
  try {
    const requests = Request.find();
    res
      .status(200)
      .json({ msg: "Retrieved Active requests successfully", requests });
  } catch (error) {
    res.status(400).json({ msg: "Error finding requests", error });
  }
};

const deletedRequest = async (req, res) => {
  const requestId = Request.findById(req.params.id);
  try {
    const request = Request.findByIdAndDelete(requestId);
    res.status(200).json({ msg: "Request successfully deleted", deletedRequest: request });
  } catch (error) {
    res.status(400).json({ msg: "Failed to delete the request", error });
  }
};

module.exports = {
  postRequest,
  getActiveRequests,
  deletedRequest,
};
