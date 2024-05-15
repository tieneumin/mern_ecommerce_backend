const express = require("express");
const { verifyPayment } = require("../controllers/payment");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { billplzId, billplzPaid, billplzPaidAt, billplzSignature } =
      req.body;
    const order = await verifyPayment(
      billplzId,
      billplzPaid,
      billplzPaidAt,
      billplzSignature
    );
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
