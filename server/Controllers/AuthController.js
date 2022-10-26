import { UserModel } from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authController = {
  registerUser: async (req, res) => {
    try {
      const { username, password, firstname, lastname } = req.body;
      if (!username || !password || !firstname || !lastname) {
        return res
          .status(400)
          .json({ message: "Please fill it out completely" });
      }
      const userExists = await UserModel.findOne({ username });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const newUser = new UserModel({
        username,
        password: hash,
        firstname,
        lastname,
      });
      const user = await newUser.save();
      if (user) {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.key_accessToken,
          { expiresIn: "1d" }
        );
        res.status(200).json({ user, token });
      } else {
        res.status(400).json({ message: "Registration failed" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username: username });
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Please fill it out completely" });
      }
      if (!user) {
        return res.status(404).json({ message: "Invalid account" });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(404).json({ message: "Wrong password" });
      }

      if (user && validPassword) {
        const token = jwt.sign(
          {
            username: user.username,
            id: user._id,
          },
          process.env.key_accessToken,
          { expiresIn: "1d" }
        );
        return res.status(200).json({ user, token });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
export default authController;
