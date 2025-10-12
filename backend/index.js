const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

app.use(cookieparser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*", // allow all origins for now (can replace with frontend URL)
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

// 👇 Add this root route (for Vercel health check)
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
