function normalise(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "");
}

module.exports = normalise;