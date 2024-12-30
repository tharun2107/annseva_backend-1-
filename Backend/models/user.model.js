const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    landmark: { type: String, required: false },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },  
  phone: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
  role: {
    type: String,
    default: "donor",
    enum: ["donor", "receiver", "volunteer"],
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;