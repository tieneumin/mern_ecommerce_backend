const express = require("express");
const {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { isAdmin } = require("../middleware/auth");

// set up product router
const router = express.Router();

// Read
router.get("/", async (req, res) => {
  try {
    // console.log(req.query);
    const { category, page, perPage } = req.query;
    res.status(200).send(await getProducts(category, page, perPage));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Read 1
router.get("/:id", async (req, res) => {
  try {
    // console.log(req.params);
    const product = await getProduct(req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send({ message: "Product not found." });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Create
router.post("/", isAdmin, async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    res.status(200).send(await addProduct(name, description, price, category));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    res
      .status(200)
      .send(
        await updateProduct(
          req.params.id,
          name,
          description,
          price,
          category,
          image
        )
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(200).send({ message: `Product #${id} deleted.` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// export
module.exports = router;
