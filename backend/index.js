const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// database connection with mongodb
mongoose
  .connect(
    "mongodb+srv://ashish23:Rawat098@cluster0.xvanywb.mongodb.net/train-cuisine"
  )
  .then(() => console.log("DB connected"))
  .catch(() => console.log("Error in db connection"));

// api creation
app.get("/", (req, res) => {
  res.send("Express app is running");
});

// Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// creating Upload Endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// router
const foodRouter = require("./router/foodRouter");
app.use("/product", foodRouter);

// userRouter
const userRouter = require("./router/userRouter");
app.use("/api", userRouter);

// cartRouter
const cartRouter = require("./router/cartRouter");
app.use("/cart", cartRouter);

// paymentRouter
const paymentRouter = require("./router/paymentRouter");
app.use("/api", paymentRouter);

// app listening
app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
