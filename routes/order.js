const express = require("express");
const {
  addOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

// set up order router
const router = express.Router();

// Read
router.get("/", async (req, res) => {
  try {
    // console.log(req);
    // const { category, page, perPage } = req.query;
    res.status(200).send(await getOrders());
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Read 1
router.get("/:id", async (req, res) => {
  try {
    // console.log(req.params);
    const order = await getOrder(req.params.id);
    if (order) {
      res.status(200).send(order);
    } else {
      res.status(404).send("Order not found.");
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, products, totalPrice, status } =
      req.body;
    res
      .status(200)
      .send(
        await addOrder(
          customerName,
          customerEmail,
          products,
          totalPrice,
          status
        )
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      products,
      totalPrice,
      status,
      billplzId,
      paidAt,
    } = req.body;
    res
      .status(200)
      .send(
        await updateOrder(
          req.params.id,
          customerName,
          customerEmail,
          products,
          totalPrice,
          status,
          billplzId,
          paidAt
        )
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const order = await getOrder(id);
    if (order) {
      await deleteOrder(id);
      res.status(200).send("Order deleted");
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// export
module.exports = router;
