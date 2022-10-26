import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: String,
    likes: [],
    image: { type: String, required: true },
    comments: [
      {
        userId: { type: String, required: true },
        username: { type: String, required: true},
        avatarImg: String,
        text: { type: String, required: true },
        timeCreated: { type: Date, required: true}
      }
    ]
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("Posts", PostSchema);
