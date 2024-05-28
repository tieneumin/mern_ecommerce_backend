const express = require("express");
const {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { isAdmin } = require("../middleware/auth");

// set up category router
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await getCategories());
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    res.status(200).send(await addCategory(req.body.name));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  try {
    res.status(200).send(await updateCategory(req.params.id, req.body.name));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    res.status(200).send(await deleteCategory(req.params.id));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// export
module.exports = router;
