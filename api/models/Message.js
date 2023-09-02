const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    content: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
