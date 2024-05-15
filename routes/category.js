const express = require("express");
const { getCategories } = require("../controllers/category");

// set up category router
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send(await getCategories());
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// export
module.exports = router;
