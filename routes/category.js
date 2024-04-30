const express = require("express");
const Product = require("../models/product");

// set up category router
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = [];
    const products = await Product.find();
    products.forEach((product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// export
module.exports = router;
