import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    boxId: { type: String, required: true },
    senderId: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model("Message", MessageSchema);
