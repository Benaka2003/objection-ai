const admin = require("../../firebase/firebaseAdmin");

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    const decodedToken = await admin
      .auth()
      .verifyIdToken(token);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = verifyUser;