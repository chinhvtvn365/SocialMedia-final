import { ChatModel } from "../Models/ChatModel.js";


const chatController = {
    createBox: async (req, res) => {
    try {
      const newBox = await new ChatModel({
        members: [req.body.senderId, req.body.receiverId],
      });

      const box = await newBox.save()
      res.status(200).json(box)
    } catch (err) {
        res.status(500).json(err);
    }
  },

  getAllBox: async (req, res) => {
    try{
        const box = await ChatModel.find({
            members: {$in: [req.body._id]}
        })
        res.status(200).json(box.sort((a, b) => {
          return b.createdAt - a.createdAt;
        }))
    }
    catch(err){
        res.status(500).json(err);
    }
  },
  getChatBox: async (req, res) => {
    try{
        const box = await ChatModel.findOne({ 
            members: {$all: [req.params.userId, req.body._id]}
        })
        res.status(200).json(box)
    }
    catch (err) {
        res.status(500).json(err);
    }
  }
};
export default chatController;
