const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS configuration for local + Vercel frontend
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "https://dispensary-frontend27.vercel.app",
];

// ✅ Allow all vercel preview URLs too (important)
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin || // allow server-to-server or Postman
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin) // ✅ allow vercel preview URLs
      ) {
        callback(null, true);
      } else {
        console.warn("❌ Blocked by CORS:", origin);
        callback(new Error("CORS not allowed"), false);
      }
    },
    credentials: true, // ✅ allow cookies and auth headers
  })
);

// ✅ Database connection
require("./connect");

// ✅ Routes
const userRoutes = require("./Routes/user");
const facilityRoutes = require("./Routes/facility");
const medicineRoutes = require("./Routes/medicine");
const hospitalRoutes = require("./Routes/nearByHospital");
const notificationRoutes = require("./Routes/notification");
const gallaryRoutes = require("./Routes/gallary");
const historyRoutes = require("./Routes/history");

// ✅ API routes
app.use("/api/auth", userRoutes);
app.use("/api/facility", facilityRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/api/nearByHospital", hospitalRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/gallary", gallaryRoutes);
app.use("/api/history", historyRoutes);

// ✅ Health check (for Vercel)
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ Global Error Handler (for debugging 500s)
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ error: err.message });
});

// ✅ Export for Vercel serverless
module.exports = app;

// ✅ Local run (only for development)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}
