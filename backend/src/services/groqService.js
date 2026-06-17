const generateResponses = require("../utils/generateResponses");

async function generateAIResponses(
  objection,
  category,
  emotionalRoot
) {
  return generateResponses(
    objection,
    category,
    emotionalRoot
  );
}

module.exports = {
  generateAIResponses,
};