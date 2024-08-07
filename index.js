import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// create a express app
const app = express();
dotenv.config();
// connecting to data base
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("db connected"))
  .catch((error) => console.log("error in connecting db"));
// port
const PORT = 3000;
app.listen(3000, () => {
  console.log(`server running in the port ${PORT}`);
});
