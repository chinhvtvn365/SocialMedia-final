import { PostModel } from "../Models/PostModel.js";
import { UserModel } from "../Models/UserModel.js";

const postController = {
  createPost: async (req, res) => {
    try {
      const newPost = await new PostModel(req.body);
      const post = await newPost.save();
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getPost: async (req, res) => {
    try {
      const id = req.params.id;

      const post = await PostModel.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updatePost: async (req, res) => {
    try {
      const id = req.params.id;
      const { userId } = req.body;

      const post = await PostModel.findById(id);
      if (userId === post.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json("Update success");
      } else {
        res.status(403).json("Invalid action");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deletePost: async (req, res) => {
    try {
    const id = req.params.id;
     await PostModel.findOneAndDelete({_id: id});
     res.status(200).json({message: "Delete Success"})
     } catch (err) {
      res.status(500).json(err);
    }
  },

  likePost: async (req, res) => {
    try {
      const id = req.params.id;
      const { userCurrentId } = req.body;

      const post = await PostModel.findById(id);
      if (!post.likes.includes(userCurrentId)) {
        await post.updateOne({ $push: { likes: userCurrentId } });
        res.status(200).json("Post like");
      } else {
        await post.updateOne({ $pull: { likes: userCurrentId } });
        res.status(200).json("Post unlike");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  commentPost: async (req, res) => {
    try {
      const id = req.params.id;
      const post = await PostModel.findById(id);
      await post.comments.unshift(req.body);
      await post.save();
      res.status(200).json(post.comments);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getTimelinePost: async (req, res) => {
    try {
      const userCurrentId = req.params.id;
      const userCurrent = await UserModel.findById(userCurrentId);
      const userCurrentPost = await PostModel.find({ userId: userCurrent._id });
      const followPost = await Promise.all(
        userCurrent.following.map((followId) => {
          return PostModel.find({ userId: followId });
        })
      );
      res.status(200).json(
        userCurrentPost.concat(...followPost).sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getPostUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const userCurrent = await UserModel.findById(userId);
      if (!userCurrent) {
        return res.status(404).json({ message: "User not found" });
      }
      const userPost = await PostModel.find({ userId });
      res.status(200).json(
        userPost.sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
export default postController;
