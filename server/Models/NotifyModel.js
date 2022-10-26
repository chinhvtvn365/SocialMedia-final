import mongoose from "mongoose";

const NotifySchema = new mongoose.Schema(
  {
    id: mongoose.Types.ObjectId,
    userId: {type: mongoose.Types.ObjectId, ref: 'Users', required: true},
    recipients: [mongoose.Types.ObjectId],
    desc: String,
    image: { type: String, required: true},
    isRead: {type: Boolean, default: false}
  },
  { timestamps: true }
);

export const NotifyModel = mongoose.model("Notify", NotifySchema);