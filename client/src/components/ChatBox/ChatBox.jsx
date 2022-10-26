import React, { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import { format } from "timeago.js";
import avatar from "../../img/avatar.jpg";
import sendmessage from "../../img/sendmessage.png";
import { getMessage } from "../../Redux/Actions/MessageAction";
import { getUserById } from "../../Redux/Actions/UserActions";
import { sendMessage } from "./../../Redux/Actions/MessageAction";
import "./ChatBox.css";

const ChatBox = ({
  messageBox,
  currentUserId,
  setSendMessage,
  receiverMessage,
  online
}) => {
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  //get user info
  useEffect(() => {
    try {
      const userId = messageBox?.members.find((id) => id !== currentUserId);
      const fetchUserData = async () => {
        const { data } = await getUserById(userId);
        setUserData(data);
      };
      if (messageBox !== null) {
        fetchUserData();
      }
    } catch (err) {
      console.log(err);
    }
  }, [messageBox, currentUserId]);

  // get all message
  useEffect(() => {
    try {
      const fetchMessageData = async () => {
        const { data } = await getMessage(messageBox._id);
        setMessage(data);
      };
      if (messageBox !== null) {
        fetchMessageData();
      }
    } catch (err) {
      console.log(err);
    }
  }, [messageBox]);

  const handleOnChangeMessage = (newMessage) => {
    setNewMessage(newMessage);
  };

  // dispatch send message
  const handleSendMessage = async (e) => {
    try {
      const sendNewMessage = {
        senderId: currentUserId,
        text: newMessage,
        boxId: messageBox._id,
      };
      const receiverId = messageBox?.members.find((id) => id !== currentUserId);
      setSendMessage({ ...sendNewMessage, receiverId });
      const { data } = await sendMessage(sendNewMessage);
      setMessage([data, ...message]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  // set message when receiver message
  useEffect(() => {
    if (
      receiverMessage !== null &&
      receiverMessage?.boxId === messageBox?._id
    ) {
      setMessage([receiverMessage, ...message]);
    }
  }, [receiverMessage]);

  return (
    <div className="ChatBox">
      {messageBox && (
        <>
          <div className="ChatBox-header">
            <div className="ChatBox-header-info">
              <div className="ChatBox-header-info-img">
                <img src={userData?.profileImg || avatar} alt="" />
                {online && <div className="ChatBox-header-info-img-online"></div>}
              </div>
              <div className="ChatBox-header-info-name">
                <span>{userData?.username || "user"}</span>
                {/* <span>Online</span> */}
              </div>
            </div>
            <hr />
          </div>
          <div className="ChatBox-body">
            {message.map((mess, idx) => (
              <div
                className={
                  mess.senderId === currentUserId
                    ? "ChatBox-body-message-send"
                    : "ChatBox-body-message"
                }
                // style={{
                //   order: `${idx+1}`,
                // }}
                key={idx}
              >
                <span>{format(mess.createdAt)}</span>
                <div className="ChatBox-body-message-info">
                  {mess.senderId !== currentUserId && (
                    <img src={userData?.profileImg || avatar} alt="" />
                  )}
                  <p className="ChatBox-body-message-text">{mess.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ChatBox-footer">
            <InputEmoji
              value={newMessage}
              onChange={handleOnChangeMessage}
              placeholder="Aa"
              onEnter={handleSendMessage}
            />
            <img src={sendmessage} alt="" onClick={handleSendMessage} />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
