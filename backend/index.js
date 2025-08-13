const express = require("express");
const app = express();
const cookieparser=require('cookie-parser');
const cors=require("cors");

require('dotenv').config({path:"./.env"})
app.use(cookieparser());
app.use(express.json());
app.use(cors({
   credentials:true,
   origin:"http://localhost:5173"
}));
// import DB connection
require('./connect');

const userRoutes=require('./Routes/user');
const facilityRoutes=require('./Routes/facility');
const medicineRoutes=require('./Routes/medicine');
const hospitalRoutes=require('./Routes/nearByHospital');
const notificationRoutes=require('./Routes/notification');
const gallaryRoutes=require('./Routes/gallary');
const historyRoutes=require('./Routes/history');
app.use("/api/auth",userRoutes);
app.use("/api/facility",facilityRoutes);
app.use("/api/medicine",medicineRoutes);
app.use("/api/nearByHospital",hospitalRoutes);
app.use("/api/notification",notificationRoutes);
app.use("/api/gallary",gallaryRoutes);
app.use("/api/history",historyRoutes);
app.listen(process.env.PORT, () => {
  console.log("✅ Server running on port",process.env.PORT);
});
