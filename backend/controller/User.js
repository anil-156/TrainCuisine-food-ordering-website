const User = require("../models/User.Model");
const jwt = require("jsonwebtoken");

// signup controller
exports.userSignup = async (req, res) => {
  const { username, email, password, userType, cartData } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      error: "Existing user found with same email",
    });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const newUser = new User({
    username,
    email,
    password,
    userType,
    cartData,
  });

  await newUser.save();

  // jwt
  const payload = {
    id: newUser.id,
    userType,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY);
  res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 });

  res.json({
    success: true,
    userType: newUser.userType,
    token,
  });
};

// login controller
exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  let existingUser = await User.findOne({ email });

  if (!existingUser) {
    return res.status(400).json({
      success: false,
    });
  }

  if (password === existingUser.password) {
    const payload = {
      id: existingUser.id,
      userType: existingUser.userType,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
    res.cookie("token", token, { maxAge: 1000 * 60 * 60 * 24 });

    existingUser.password = undefined;
    return res.json({
      success: true,
      userType: existingUser.userType,
      token,
      user: existingUser,
    });
  } else {
    return res.json({
      success: false,
      error: "Credentials not match",
    });
  }
};
