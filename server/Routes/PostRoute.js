import express from "express";
import postController from "../Controllers/PostController.js";

const router = express.Router();
router.post("/", postController.createPost);
router.get("/:id", postController.getPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);
router.put("/:id/comment", postController.commentPost)
router.put("/:id/like", postController.likePost);
router.get("/timeline/:id", postController.getTimelinePost);
router.get("/postuser/:id", postController.getPostUserById)
export default router;
