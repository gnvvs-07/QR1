import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// routing
import authRoutes from "./api/routes/auth.route.js";
import userRoutes from "./api/routes/user.routes.js"
// create a express app
const app = express();
dotenv.config();
// connecting to data base
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("db connected"))
  .catch((error) => console.log("error in connecting db"));

// middle wares and express access to json files
app.use(express.json());
// routing
// authentication routing
app.use("/api/auth", authRoutes);
app.use("/api/users",userRoutes)
// error handler(mini)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  // generate the response
  // **imp ======== success is frequently used ======= imp**
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
// port
const PORT = 3000;
app.listen(3000, () => {
  console.log(`server running in the port ${PORT}`);
});
