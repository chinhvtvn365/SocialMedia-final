import {
  UilLocationPoint,
  UilPlayCircle,
  UilScenery,
  UilSchedule,
} from "@iconscout/react-unicons";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import avatar from "../../img/avatar.jpg";
import Message from "./../LoadingError/Error";
import PostCreateModal from "./../PostCreateModal/PostCreateModal";
import "./PostCreate.css";

const PostCreate = () => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const { user } = userInfo;
  const postCreate = useSelector((state) => state.postCreate);
  const { error} = postCreate;
  const [postModal, setPostModal] = useState(false);

  return (
    <div className="PostCreate">
      <img
        className="PostCreate-infoImg"
        src={user.profileImg || avatar}
        alt=""
      />
      <div className="PostCreate-share" onClick={() => setPostModal(true)}>
        <input
          required
          type="text"
          placeholder={`Hi ${user.lastname}, what are you thinking ?`}
        />
        <div className="PostCreate-option">
          <div className="option">
            <UilScenery />
            Photo
          </div>
          <div className="option">
            <UilPlayCircle />
            Video
          </div>
          <div className="option">
            <UilLocationPoint />
            Location
          </div>
          <div className="option">
            <UilSchedule />
            Schedule
          </div>
          <button className="button PostCreate-button">Share</button>
        </div>
        {error && <Message variant="alert-danger">{error}</Message>}
      </div>
      <PostCreateModal
        postModal={postModal}
        setPostModal={setPostModal}
        user={user}
      />
    </div>
  );
};

export default PostCreate;
