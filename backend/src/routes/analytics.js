const express = require("express");
const router = express.Router();

const {
  getAnalytics,
} = require("../services/firebaseService");

router.get("/", async (req, res) => {
  try {
    const analytics = await getAnalytics();

    res.json(analytics);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch analytics",
    });
  }
});

module.exports = router;