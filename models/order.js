const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// set up schema
const orderSchema = new Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  products: { type: Array, required: true },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    default: "pending",
    // limit value to following options only
    enum: ["pending", "paid", "failed", "completed"],
  },
  billplzId: String,
  paidAt: Date,
});

// convert schema to model, export
const Order = model("Order", orderSchema);
module.exports = Order;
