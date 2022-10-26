import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    profileImg: String,
    coverImg: String,
    relationship: String,
    live: String,
    school: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("Users", UserSchema);
