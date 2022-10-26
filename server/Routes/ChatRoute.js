import express from "express";
import chatController from './../Controllers/ChatController.js';

const router = express.Router();

router.post("/", chatController.createBox);
router.post("/boxchat", chatController.getAllBox);
router.post("/t/:userId", chatController.getChatBox);

export default router;
