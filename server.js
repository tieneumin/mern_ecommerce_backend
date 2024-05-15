const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

// create Express app
const app = express();

// apply JSON middleware
app.use(express.json());

// set uploads folder as static path
app.use("/uploads", express.static("uploads"));

// set up CORS policy
const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 200,
});
// apply policy to middleware
app.use(corsHandler);

// connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce") // change name for new project
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch((error) => {
    console.log(error);
  });

// import routers
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const imageRouter = require("./routes/image");
const orderRouter = require("./routes/order");
const paymentRouter = require("./routes/payment");

// define paths
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/images", imageRouter);
app.use("/orders", orderRouter);
app.use("/payment", paymentRouter);

// start server
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000.");
});
