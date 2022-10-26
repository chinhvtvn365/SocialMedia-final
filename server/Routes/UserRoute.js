import express from "express";
import userController from "../Controllers/UserController.js";
import authMiddleWare from './../Controllers/MiddleControllers.js';

const router = express.Router();
router.get("/getUser/:id", userController.getUser);
router.get("/getAllUser",  userController.getAllUser);
router.get("/search", userController.searchUser)
router.put("/:id", authMiddleWare, userController.updateUser);
router.put("/:id/follow", authMiddleWare, userController.followUser);
router.put("/:id/unfollow", authMiddleWare, userController.unfollowUser);
router.delete("/:id", authMiddleWare, userController.deleteUser);
export default router;
