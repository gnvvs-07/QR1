import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

// Routing
import authRoutes from "./api/routes/auth.route.js";
import userRoutes from "./api/routes/user.routes.js";

const app = express();
dotenv.config();

// Connecting to database
mongoose.connect(process.env.MONGO)
  .then(() => console.log("DB connected"))
  .catch((error) => console.log("Error connecting to DB:", error));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routing
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

// Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
