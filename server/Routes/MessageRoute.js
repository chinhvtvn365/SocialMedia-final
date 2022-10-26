import express from "express";
import messageController from './../Controllers/MessageController.js';

const router = express.Router();

router.post("/", messageController.sendNewMessage);
router.get("/:boxId", messageController.getMessage);
// router.get("/lastmess/:messId", messageController.getLastMessage);

export default router;