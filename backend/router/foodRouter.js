const express = require("express");
const foodRouter = express.Router();

const {
  getAllProducts,
  addProduct,
  removeProduct,
  newFoodItems,
  pahadiSpecial,
} = require("../controller/Product");
// const { Auth } = require("../middleware/Auth");
// const { isAdmin } = require("../middleware/isAdmin");

foodRouter.route("/addproduct").post(addProduct);

foodRouter.route("/removeproduct").post(removeProduct);

foodRouter.route("/allproducts").get(getAllProducts);

foodRouter.route("/newfooditems").get(newFoodItems);

foodRouter.route("/pahadispecial").get(pahadiSpecial);

module.exports = foodRouter;
