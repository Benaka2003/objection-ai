const taxonomy = require("../data/taxonomy");
const emotionalRoots = require("../data/emotionalRoots");
const normalise = require("./normalise");

function classify(input) {
  const text = normalise(input);

  for (const category in taxonomy) {
    for (const keyword of taxonomy[category]) {
      if (text.includes(keyword)) {
        return {
          category,
          emotionalRoot: emotionalRoots[category],
          confidence: 0.9
        };
      }
    }
  }

  return {
    category: "trust",
    emotionalRoot: emotionalRoots.trust,
    confidence: 0.5
  };
}

module.exports = classify;