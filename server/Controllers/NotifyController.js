import { NotifyModel } from "../Models/NotifyModel.js";

const notifyController = {
  createNotify: async (req, res) => {
    try {
      const { id, userId, recipients, desc, image } = req.body;

      if (recipients.includes(userId.toString())) {
        return res.status(403).json({ message: "Invalid action" });
      }

      const notify = new NotifyModel({
        id,
        recipients,
        desc,
        image,
        userId,
      });

      await notify.save();
      return res.status(200).json(notify);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getNotify: async (req, res) => {
    try {
      const notify = await NotifyModel.find({ recipients: req.params.id })
         .sort('-createdAt')
         .populate("userId", "profileImg username");
        return res.status(200).json(notify);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  isRead: async (req, res) => {
    try {
      const notify = await NotifyModel.findByIdAndUpdate(req.params.id, {isRead: true}, {new: true})
      res.status(200).json(notify);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // isReadAll: async (req, res) => {
  //   try {
  //     const notify = await NotifyModel.updateMany({ recipients: req.params.userId }, {isRead: true})
  //     res.status(200).json(notify);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },
};
export default notifyController;
