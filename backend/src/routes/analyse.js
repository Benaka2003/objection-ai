const express = require("express");
const router = express.Router();

const classify = require("../utils/classify");
const generateResponses = require("../utils/generateResponses");

router.post("/", async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || input.trim().length < 5) {
      return res.status(400).json({
        error: "Please describe the objection in more detail"
      });
    }

    const classification = classify(input);

    const responses = await generateResponses(
      input,
      classification.category,
      classification.emotionalRoot
    );

    res.json({
      objectionId: Date.now().toString(),
      category: classification.category,
      emotionalRoot: classification.emotionalRoot,
      responses
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate responses"
    });
  }
});

module.exports = router;