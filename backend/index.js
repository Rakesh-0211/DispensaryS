const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

app.use(cookieParser());
app.use(express.json());

// ✅ Fixed CORS configuration (for both local and vercel frontend)
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "https://dispensary-frontend27.vercel.app",
];

// ✅ Allow Vercel preview URLs like https://dispensary-frontend27-git-main-xxxxx.vercel.app
app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin || // allow server-to-server or mobile requests
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/.test(origin) // allow all vercel preview and prod URLs
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

// ✅ Health check for Vercel
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ Export for Vercel
module.exports = app;

// ✅ Local run (only runs when not serverless)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}
