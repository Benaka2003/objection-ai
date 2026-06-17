const express = require("express");
const router = express.Router();

const classify = require("../utils/classify");

const {
  saveAnalysis,
} = require("../services/firebaseService");

const {
  generateAIResponses,
} = require("../services/groqService");

router.post("/", async (req, res) => {
  try {
    const { input } = req.body;

    if (!input || input.trim().length < 5) {
      return res.status(400).json({
        error: "Please describe the objection in more detail",
      });
    }

    const classification = classify(input);

    const responses = await generateAIResponses(
      input,
      classification.category,
      classification.emotionalRoot
    );

    const analysisId = await saveAnalysis({
      input,
      category: classification.category,
      emotionalRoot: classification.emotionalRoot,
      responses,
    });

    res.json({
      objectionId: analysisId,
      category: classification.category,
      emotionalRoot: classification.emotionalRoot,
      responses,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate responses",
    });
  }
});

module.exports = router;