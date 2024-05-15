const express = require("express");
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

// set up product router
const router = express.Router();

// Create
router.post("/", async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    res.status(200).send(await addProduct(name, description, price, category));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Read
router.get("/", async (req, res) => {
  try {
    // console.log(req);
    res.status(200).send(await getProducts(req.query.category));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Read 1
router.get("/:id", async (req, res) => {
  try {
    // console.log(req.params);
    res.status(200).send(await getProduct(req.params.id));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    res
      .status(200)
      .send(
        await updateProduct(req.params.id, name, description, price, category)
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(200).send({ message: `Product #${id} has been deleted.` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// export
module.exports = router;
