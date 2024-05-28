const Product = require("../models/product");
const Category = require("../models/category");

const getCategories = async () => {
  return await Category.find().sort({ name: 1 });
};

const addCategory = async (name) => {
  const addedCategory = new Category({ name });
  await addedCategory.save();
  return addedCategory;
};

const updateCategory = async (id, name) => {
  return await Category.findByIdAndUpdate(id, { name }, { new: true });
};

const deleteCategory = async (id) => {
  // ensure no products under category
  const products = await Product.find({ category: id });
  if (products && products.length > 0) {
    throw new Error("Category is currently in use.");
  }
  // delete category
  return await Category.findByIdAndDelete(id);
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
