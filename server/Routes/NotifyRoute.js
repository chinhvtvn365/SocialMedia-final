import express from "express";
import notifyController from './../Controllers/NotifyController.js';

const router = express.Router();

router.post("/", notifyController.createNotify);
router.get("/:id", notifyController.getNotify);
router.put("/:id", notifyController.isRead);
// router.put("/:userId/readnoti", notifyController.isReadAll);

export default router;