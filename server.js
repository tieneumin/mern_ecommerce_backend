const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

// create express app
const app = express();

// apply JSON middleware
app.use(express.json());

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
  .connect("mongodb://127.0.0.1:27017/ecommerce") // change for new project
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch((error) => {
    console.log(error);
  });

// import routers
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");

// define paths
app.use("/products", productRouter);
app.use("/categories", categoryRouter);

// start server
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000.");
});
