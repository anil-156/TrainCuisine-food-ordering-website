const express = require("express");

const paymentRouter = express.Router();
const { checkout } = require("../controller/Payment");

paymentRouter.post("/create-checkout-session", checkout);

module.exports = paymentRouter;
