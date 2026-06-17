const express = require("express");
const router = express.Router();

const {
  getHistory,
} = require("../services/firebaseService");

router.get("/", async (req, res) => {
  try {
    const history = await getHistory();

    res.json(history);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to fetch history",
    });
  }
});

module.exports = router;