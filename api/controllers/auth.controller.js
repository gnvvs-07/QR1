import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  // form data from the req.body from the user
  const { username, email, password } = req.body;
  // validating formdata
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // response generated
    // using error hanlder
    next(errorHandler(400, "All fields are required"));
  }
  //   hash the password and save the user details to the db
  const hashedPassword = bcryptjs.hashSync(password, 10);
  //   create a new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  //   save the new user
  try {
    await newUser.save();
    //   response generated
    res.status(200).json({ message: "user account creation successfull" });
  } catch (error) {
    // response generated
    // error handler used
    next(error);
  }
};
