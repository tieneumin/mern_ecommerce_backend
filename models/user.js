const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// set up schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

// convert schema to model, export
const User = model("User", userSchema);
module.exports = User;
