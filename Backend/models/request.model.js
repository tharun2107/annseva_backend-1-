const mongoose = require("mongoose");
const { Schema } = mongoose;

const receiverRequestSchema = new mongoose.Schema(
  {
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantity: { type: Number, required: true },
    // receiverName: { type: String, required: true },
    // location: {
      //   name: { type: String, required: true },
      //   lat: { type: Number, required: true },
      //   long: { type: Number, required: true },
      // },
      // foodItems: [{ type: String, required: true }],
      // status: {
      //   type: String,
      //   enum: ["pending", "taken", "complete"],
      //   default: "pending",
      // },
    // message: { type: String, default: "--" },
  },
  { timestamps: true }
);

 
module.exports = mongoose.models.ReceiverRequest || mongoose.model("ReceiverRequest", receiverRequestSchema);
