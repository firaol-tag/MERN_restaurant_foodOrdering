require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./server/config/db.js");
const foodRouter = require("./server/API/food/food.router.js");
const multer = require("multer");
const userRouter = require("./server/API/user/user.router.js");
const cartRouter = require("./server/API/cart/cart.router.js");
const orderRouter = require("./server/API/orders/orders.router.js");
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
// connectDB();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use("/upload", express.static("upload"));
app.get("/", (req, res) => {
  res.send("allright");
});
app.use("/api/food", upload.fields([{ name: "image" }]), foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(3040, (err, res) => {
  if (err) {
    console.log("server got some failure");
  }
  console.log("surver is successfully running");
});
