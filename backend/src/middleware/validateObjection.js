module.exports = (req, res, next) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({
      success: false,
      error: "Input is required",
    });
  }

  if (input.trim().length < 5) {
    return res.status(400).json({
      success: false,
      error: "Objection must be at least 5 characters",
    });
  }

  next();
};