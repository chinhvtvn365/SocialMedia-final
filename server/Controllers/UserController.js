import { UserModel } from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userController = {
  getUser: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await UserModel.findById(id);
      if (user) {
        const { password, ...other } = user._doc; // bỏ password khỏi res trả về
        res.status(200).json(other);
      } else {
        res.status(404).json({ message: "User does not exist" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllUser: async (req, res) => {
    try{
      let users = await UserModel.find();

      users = users.map((user) => {
        const {password, ...other} = user._doc
        return other
      })
      res.status(200).json(users.sort((a, b) => {
        return b.createdAt - a.createdAt;
      }));
    }
    catch(error){
      res.status(500).json(error);
    }
  },
  searchUser: async (req, res) => {
    try {
      const users = await UserModel.find({
        $or: [
          { username: { $regex: req.query.name } },
          { firstname: { $regex: req.query.name } },
          { lastname: { $regex: req.query.name } },
        ],
      })
        .limit(10)
        .select("firstname username lastname profileImg");
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    const id = req.params.id;
    const { _id, adminStatus, password } = req.body;
    if (id === _id || adminStatus) {
      try {
        if (password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(password, salt);
        }
        const user = await UserModel.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.key_accessToken,
          { expiresIn: "1d" }
        );
        res.status(200).json({user, token});
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Access denied");
    }
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;
    const { userCurrentId, adminStatus } = req.body;

    if (id === userCurrentId || adminStatus) {
      try {
        await UserModel.findByIdAndDelete(id);
        res.status(200).json("Delete success");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Access denied");
    }
  },

  followUser: async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;

    if (id === _id) {
      res.status(403).json("Invalid action");
    } else {
      try {
        const followerUser = await UserModel.findById(id);
        const followingUser = await UserModel.findById(_id);

        if (!followerUser.followers.includes(_id)) {
          await followerUser.updateOne({ $push: { followers: _id } }),
            await followingUser.updateOne({ $push: { following: id } });
          res.status(200).json("Follow success");
        } else {
          res.status(403).json("User is already followed");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  },

  unfollowUser: async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;

    if (id === _id) {
      res.status(403).json("Invalid action");
    } else {
      try {
        const followerUser = await UserModel.findById(id);
        const followingUser = await UserModel.findById(_id);

        if (followerUser.followers.includes(_id)) {
          await followerUser.updateOne({ $pull: { followers: _id } }),
            await followingUser.updateOne({ $pull: { following: id } });
          res.status(200).json("Unfollow success");
        } else {
          res.status(403).json("User is not followed by you");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    }
  },
};
export default userController;
