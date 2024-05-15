const Product = require("../models/product");

const getCategories = async () => {
  let categories = [];
  const products = await Product.find();
  products.forEach((p) => {
    if (!categories.includes(p.category)) {
      categories.push(p.category);
    }
  });
  return categories;
};

module.exports = {
  getCategories,
};
