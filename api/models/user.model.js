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
      default:"https://images.unsplash.com/photo-1711283804096-7b8516ba60c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGFuaW1lfGVufDB8fDB8fHww"
    },
    backgroundPic: {
      type: String,
      default:"https://images.unsplash.com/photo-1548439935-9e1390d83250?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTl8fHxlbnwwfHx8fHw%3D"
    },
  },
  { timestamps: true }
);

// export the model User
const User = mongoose.model("User", userSchema);
export default User;
