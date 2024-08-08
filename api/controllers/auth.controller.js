import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// models and utilities
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// signup function
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

// signin function
export const signin = async (req, res, next) => {
  try {
    // user data from the formData
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All fields must be filled / required"));
    }
    //   find the user by email
    const validUser = await User.findOne({ email });
    //   check if the user exists
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    // comparing the password with the hashed password
    // password is entered by user and validUser.password is encrypted password in the database
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // if password doesnot match
    if (!validPassword) {
      return next(
        errorHandler(500, "Incorrect email and Password combination")
      );
    }
    // generating the token using jwt
    // collecting user data and creating the access_token for the user
    const { password: pass, ...others } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    //   response generated and setting the token of valid User to cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(others);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email });

    if (user) {
      // Generate a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      // Exclude the password from the response
      const { password, ...rest } = user._doc;
      // Send response with token and user details
      res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest);
    } else {
      // Generate a secure password
      const generatedPassword = Math.random().toString(36).slice(-8) + '_google_' + Math.random().toString(36).slice(-8);
      // Hash the password
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      // Create a new user
      user = new User({
        username: name.toLowerCase().replace(/\s+/g, '') + Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        profilePic: googlePhotoUrl,
      });
      // Save the new user
      await user.save();
      // Generate a token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      // Exclude the password from the response
      const { password, ...rest } = user._doc;
      // Send response with token and user details
      res
        .status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};