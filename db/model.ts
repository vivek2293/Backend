import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const postSchema = new mongoose.Schema({
  post: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
export const Post = mongoose.model("Post", postSchema);