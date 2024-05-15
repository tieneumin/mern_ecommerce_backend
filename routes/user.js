// routes
const express = require("express");
const { loginUser, signUpUser } = require("../controllers/user");

const router = express.Router();

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // log user in
    res.status(200).send(await loginUser(email, password));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // create user via signUpUser()
    res.status(200).send(await signUpUser(name, email, password));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
