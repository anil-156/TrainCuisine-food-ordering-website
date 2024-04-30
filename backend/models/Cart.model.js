const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  foodDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
  },
  userDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
