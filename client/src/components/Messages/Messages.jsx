import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import messagepen from "../../img/messagepen.png";
import ChatBox from "../ChatBox/ChatBox";
import { getAllBox } from "./../../Redux/Actions/MessageAction";
import Box from "./../Box/Box";
import Header from "./../Header/Header";
import { SOCKET_URL } from "../../api/url";
import "./Messages.css";

const Messages = () => {
  const { user } = useSelector((state) => state.userLogin.userInfo);
  const { boxInfo } = useSelector((state) => state.getAllBoxChat);

  const [messageBox, setMessageBox] = useState(null);
  const [online, setOnline] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiverMessage, setReceiverMessage] = useState(null);
  const socket = useRef();
  const dispatch = useDispatch();

  // get box
  useEffect(() => {
    try {
      const fetchBoxChat = async () => {
        await dispatch(getAllBox(user));
      };
      fetchBoxChat();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //create socket server
  useEffect(() => {
    socket.current = io(SOCKET_URL);
    socket.current.emit("add-user", user._id);
    socket.current.on("get-user", (user) => {
      setOnline(user);
    });
  }, [user]);

  //socket send mess
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

    //socket receiver mess
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiverMessage(data);
    });
  }, []);

  //check online
  const onlineStatus = (box) => {
    const userMember = box?.members.find((id) => id !== user._id);
    const isOnline = online.find((user) => user.userId === userMember);
    return isOnline ? true : false;
  };

  return (
    <>
      <Header />
      <div className="Message-inner">
        <div className="Message">
          <section className="Message-box">
            <div className="Message-box-search">
              <input type="text" placeholder="Search" />
              <img src={messagepen} alt="" />
            </div>
            <div className="Message-box-item">
              {boxInfo.map((box, idx) => (
                <div onClick={() => setMessageBox(box)} key={idx}>
                  <Box
                    dataBox={box}
                    userCurrentId={user._id}
                    online={onlineStatus(box)}
                  />
                </div>
              ))}
            </div>
          </section>
          <section className="Message-chat">
            <ChatBox
              messageBox={messageBox}
              currentUserId={user._id}
              setSendMessage={setSendMessage}
              receiverMessage={receiverMessage}
              online={onlineStatus(messageBox)}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default Messages;
