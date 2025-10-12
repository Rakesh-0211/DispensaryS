const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

// Connect DB
require("./connect");

// Routes
app.use("/api/auth", require("./Routes/user"));
app.use("/api/facility", require("./Routes/facility"));
app.use("/api/medicine", require("./Routes/medicine"));
app.use("/api/nearByHospital", require("./Routes/nearByHospital"));
app.use("/api/notification", require("./Routes/notification"));
app.use("/api/gallary", require("./Routes/gallary"));
app.use("/api/history", require("./Routes/history"));

// Default route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// Export the Express app for Vercel
module.exports = app;

// Local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}
