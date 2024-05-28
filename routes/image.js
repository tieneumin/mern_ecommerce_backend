const express = require("express");
const multer = require("multer");

const router = express.Router();

// Ctrl+F "DiskStorage" https://www.npmjs.com/package/multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // console.log(req.file.path);
    // get and send image URL from multer
    res.status(200).send({ image_url: req.file.path });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
