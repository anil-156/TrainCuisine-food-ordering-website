const express = require("express");
const {
  addToCart,
  deleteFromCart,
  fetchCartItem,
} = require("../controller/Cart");

const cartRouter = express.Router();

cartRouter
  .post("/addtocart", addToCart)
  .post("/deletefromcart", deleteFromCart)
  .post("/fetchcartitem", fetchCartItem);

module.exports = cartRouter;
