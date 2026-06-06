require("dotenv").config();

const classify = require(
  "./src/utils/classify"
);

const generateResponses = require(
  "./src/utils/generateResponses"
);

async function run() {
  const objection =
    "Your product is too expensive";

  const result =
    classify(objection);

  const responses =
    await generateResponses(
      objection,
      result.category,
      result.emotionalRoot
    );

  console.log(responses);
}

run();