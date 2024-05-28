const axios = require("axios");
const Order = require("../models/order");

// load data from config
const {
  BILLPLZ_API_URL,
  BILLPLZ_API_KEY,
  BILLPLZ_COLLECTION_ID,
  FRONTEND_URL,
} = require("../config");

// Create
const addOrder = async (
  customerName,
  customerEmail,
  products,
  totalPrice,
  status
) => {
  try {
    // 1. create billplz bill
    const billplzRes = await axios({
      method: "POST",
      url: BILLPLZ_API_URL + "v3/bills",
      auth: { username: BILLPLZ_API_KEY, password: "" },
      data: {
        collection_id: BILLPLZ_COLLECTION_ID,
        email: customerEmail,
        name: customerName,
        // lowest currency unit as per https://www.billplz-sandbox.com/api#v3-bills-create-a-bill
        amount: parseFloat(totalPrice) * 100,
        description: "Payment for order",
        // 2 different URLs IRL but same for us as using localhost
        callback_url: FRONTEND_URL + "verify-payment", // backend URL
        redirect_url: FRONTEND_URL + "verify-payment", // frontend URL
      },
    });

    // 2. retrieve billplz id and url
    const { id, url } = billplzRes.data;

    // 3. create new order
    const addedOrder = new Order({
      customerName,
      customerEmail,
      products,
      totalPrice,
      status,
      billplzId: id,
    });
    await addedOrder.save();
    return {
      ...addedOrder,
      billplzUrl: url,
    };
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }
};

// Read
const getOrders = async (user) => {
  // console.log(user);
  try {
    let filters = {};
    if (user && user.role === "user") {
      filters.customerEmail = user.email;
    }
    // console.log(filters);
    return await Order.find(filters).sort({ _id: -1 }); // sort by latest added
  } catch (error) {
    throw new Error(error);
  }
};

// Read 1
const getOrder = async (id) => {
  try {
    return await Order.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

// Update
const updateOrder = async (
  id,
  customerName,
  customerEmail,
  products,
  totalPrice,
  status,
  billplzId,
  paidAt
) => {
  try {
    return await Order.findByIdAndUpdate(
      id,
      {
        customerName,
        customerEmail,
        products,
        totalPrice,
        status,
        billplzId,
        paidAt,
      },
      { new: true }
    );
  } catch (error) {
    throw new Error(error);
  }
};

// Delete
const deleteOrder = async (id) => {
  try {
    return await Order.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

// export
module.exports = {
  addOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
