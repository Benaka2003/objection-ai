async function saveAnalysis(data) {
  return `analysis_${Date.now()}`;
}

async function getHistory() {
  return [];
}

async function getAnalytics() {
  return {
    totalAnalyses: 0,
    price: 0,
    trust: 0,
    timing: 0,
    authority: 0,
  };
}

module.exports = {
  saveAnalysis,
  getHistory,
  getAnalytics,
};