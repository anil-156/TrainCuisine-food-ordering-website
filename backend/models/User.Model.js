const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    enum: ["user", "admin"],
  },
  cartData: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
