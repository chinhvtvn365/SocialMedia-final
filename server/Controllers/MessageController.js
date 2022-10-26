import { MessageModel } from "../Models/MessageModel.js";


const messageController = {
    sendNewMessage: async (req, res) => {
    try {
      const {boxId, senderId, text} = req.body
      const message = await new MessageModel({boxId, senderId, text})
      const mess = await message.save()
      res.status(200).json(mess)
      }
     catch (err) {
        res.status(500).json(err);
    }
  },
  getMessage: async (req, res) => {
    try {
      const boxId = req.params.boxId;
      const mess = await MessageModel.find({boxId})
      res.status(200).json(mess.sort((a, b) => {
        return b.createdAt - a.createdAt;
      }))
      }
     catch (err) {
        res.status(500).json(err);
    }
  },
  // getLastMessage: async (req, res) => {
  //   try {
  //     const messId = req.params.messId;
  //     const mess = await MessageModel.find({messId})
  //     res.status(200).json(mess)
  //     }
  //    catch (err) {
  //       res.status(500).json(err);
  //   }
  // },
};
export default messageController;
