const express = require("express");

const { protect, ownerOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

router.get("/owner", protect, ownerOnly, (req, res) => {
  res.json({
    message: "Welcome Owner",
  });
});

module.exports = router;
