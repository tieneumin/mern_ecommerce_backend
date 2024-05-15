const Product = require("../models/product");

// Create
const addProduct = async (name, description, price, category) => {
  try {
    const addedProduct = new Product({ name, description, price, category });
    await addedProduct.save();
    return addedProduct;
  } catch (error) {
    throw new Error(error);
  }
};

// Read
const getProducts = async (category) => {
  try {
    // only show X category e.g. Consoles
    let filters = {};
    if (category) {
      filters.category = category;
    }
    // console.log(filters);

    // sort list by date entered, potentially by category name, price
    let displayOrder = { _id: -1 };

    return await Product.find(filters).sort(displayOrder);
  } catch (error) {
    throw new Error(error);
  }
};

// Read 1
const getProduct = async (id) => {
  try {
    return await Product.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

// Update
const updateProduct = async (id, name, description, price, category) => {
  try {
    return await Product.findByIdAndUpdate(
      id,
      { name, description, price, category },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
};

// Delete
const deleteProduct = async (id) => {
  try {
    return await Product.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

// export
module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
