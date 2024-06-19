const mongoose = require("mongoose");

const userCredential = new mongoose.Schema({
  loginid: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  organizationType: {
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("User Credential", userCredential);
