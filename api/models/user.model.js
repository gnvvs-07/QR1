import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
    },
    backgroundPic: {
      type: String,
    },
  },
  { timestamps: true }
);

// export the model User
const User = mongoose.model("User", userSchema);
export default User;
