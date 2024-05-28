const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// set up schema
const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  image: String,
});

// convert schema to model, export
const Product = model("Product", productSchema);
module.exports = Product;
