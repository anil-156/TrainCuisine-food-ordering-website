exports.isAdmin = (req, res, next) => {
  try {
    const { userType } = req.user;
    if (userType === "admin") {
      next();
    } else {
      console.log("You are not admin");
      return res.status(500).json("Invalid Operation");
    }
  } catch (err) {
    console.log("error in isAdmin -> ", err.message);
    res.status(500).json("internal server error");
  }
};
