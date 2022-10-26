import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
    members: {
        type: Array,
        required: true
    }},
    {timestamps: true}
)

export const ChatModel = mongoose.model("Chat", ChatSchema);