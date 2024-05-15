const crypto = require("crypto");
const { BILLPLZ_X_SIGNATURE } = require("../config");
const Order = require("../models/order");

const verifyPayment = async (
  billplzId,
  billplzPaid,
  billplzPaidAt,
  billplzSignature
) => {
  // verify signature // https://www.billplz-sandbox.com/api#payment-completion-x-signature-redirect-url
  const billplzString = `billplzid${billplzId}|billplzpaid_at${billplzPaidAt}|billplzpaid${billplzPaid}`;
  const x_signature = crypto
    .createHmac("sha256", BILLPLZ_X_SIGNATURE)
    .update(billplzString)
    .digest("hex");

  // compare x signature with billplz's
  if (x_signature !== billplzSignature) {
    throw new Error("Signature not valid");
  } else {
    // if signature correct, update order status, payment date

    // find order using billplz id
    const selectedOrder = await Order.findOne({ billplzId });

    // check if order exists
    if (!selectedOrder) {
      // if order not found, throw error
      throw new Error("Order not found");
    } else {
      // if order found, update order
      selectedOrder.status = billplzPaid === "true" ? "paid" : "failed";
      selectedOrder.paidAt = billplzPaidAt;

      // save the order
      const updatedOrder = await selectedOrder.save();
      return updatedOrder;
    }
  }
};

module.exports = {
  verifyPayment,
};
