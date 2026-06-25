const express = require("express");

const upload = require("../middleware/uploadMiddleware");

const { uploadImages } = require("../controllers/uploadController");

const router = express.Router();

router.post("/multiple", upload.array("images", 10), uploadImages);

module.exports = router;
