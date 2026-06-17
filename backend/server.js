const express = require("express");
const cors = require("cors");
require("dotenv").config();

const analyseRoute = require("./src/routes/analyse");
const historyRoute = require("./src/routes/history");
const analyticsRoute = require("./src/routes/analytics");

const errorHandler = require("./src/middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/analyse", analyseRoute);
app.use("/history", historyRoute);
app.use("/analytics", analyticsRoute);

app.get("/health", (req, res) => {
  res.json({
    success: true,
    status: "healthy",
    service: "ObjectionAI Backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/* =========================
   404 HANDLER GOES HERE
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

/* =========================
   ERROR HANDLER LAST
========================= */

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});