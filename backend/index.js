const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

app.use(cookieParser());
app.use(express.json());

// Corrected CORS
const allowedOrigins = ["http://localhost:5173"]; // Add your frontend URLs here
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true, // allow cookies
  })
);

// DB connection
require("./connect");

// Routes
const userRoutes = require("./Routes/user");
const facilityRoutes = require("./Routes/facility");
const medicineRoutes = require("./Routes/medicine");
const hospitalRoutes = require("./Routes/nearByHospital");
const notificationRoutes = require("./Routes/notification");
const gallaryRoutes = require("./Routes/gallary");
const historyRoutes = require("./Routes/history");

app.use("/api/auth", userRoutes);
app.use("/api/facility", facilityRoutes);
app.use("/api/medicine", medicineRoutes);
app.use("/api/nearByHospital", hospitalRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/gallary", gallaryRoutes);
app.use("/api/history", historyRoutes);

// Root route (for Vercel health check)
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// Export for Vercel serverless
module.exports = app;

// Local run support
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}
