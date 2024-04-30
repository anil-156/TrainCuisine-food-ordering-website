const Food = require("../models/Food.model");

exports.addProduct = async (req, res) => {
  let products = await Food.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const newFood = new Food({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    subcategory: req.body.subcategory,
    foodtype: req.body.foodtype,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });

  await newFood.save();

  res.json({
    success: true,
    name: req.body.name,
  });
};

// removeProduct
exports.removeProduct = async (req, res) => {
  await Food.findOneAndDelete({ id: req.body.id });
  res.json({
    success: true,
  });
};

// getAllProduct
exports.getAllProducts = async (req, res) => {
  const foodDetails = await Food.find({});

  res.json({
    foodDetails,
  });
};

exports.newFoodItems = async (req, res) => {
  let item = await Food.find({});
  let newFoodItems = item.slice(1).slice(-8);

  return res.json(newFoodItems);
};

exports.pahadiSpecial = async (req, res) => {
  let items = await Food.find({ foodtype: "pahadi" });
  let pahadiSpecial = items.slice(-4);

  res.send(pahadiSpecial);
};
