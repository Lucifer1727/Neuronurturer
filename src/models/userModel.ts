import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please enter a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please enter a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordExpiry: {
    type: Date,
  },
  verifyToken: {
    type: String,
  },
  verifyTokenExpiry: {
    type: Date,
  }, 
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
