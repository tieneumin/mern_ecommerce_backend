const Product = require("../models/product");

// Read
const getProducts = async (category, page = 1, perPage = 6) => {
  try {
    // only show category X e.g. Consoles
    let filters = {};
    if (category) {
      filters.category = category;
    }
    // console.log(filters);

    // sort list by latest added
    let latestAdded = { _id: -1 };

    /* 
      Pagination
      .skip() // skips given amount
      .limit() // limits items returned
    */
    return await Product.find(filters)
      .skip((page - 1) * perPage)
      .sort(latestAdded)
      .limit(perPage);
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

// Update
const updateProduct = async (id, name, description, price, category, image) => {
  try {
    return await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, image },
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
