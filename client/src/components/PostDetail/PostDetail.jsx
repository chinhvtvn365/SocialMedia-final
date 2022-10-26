import { Modal, useMantineTheme } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import another from "../../img/another.png";
import deletePostImg from "../../img/delete.png";
import updatePost from "../../img/update.png";
import { format } from "timeago.js";
import avatar from "../../img/avatar.jpg";
import comment from "../../img/comment.png";
import love from "../../img/love.png";
import share from "../../img/share.png";
import unlove from "../../img/unlove.png";
import InputEmoji from "react-input-emoji";
import "./PostDetail.css";
const PostDetail = ({
  modal,
  setModal,
  postData,
  userData,
  liked,
  handleLike,
  likes,
  listComment,
  user,
  cmtText,
  setCmtText,
  handleOnEnter,
  handleDeletePost,
  handleEditPost
}) => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const refOpenAnother = useRef(null);
  const handleClickOutside = (event) => {
    if (
      refOpenAnother.current &&
      !refOpenAnother.current.contains(event.target)
    ) {
      setOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  const onHandleEditPost = () => {
    setModal(false);
    handleEditPost()
  }
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modal}
      onClose={() => {
        setModal(false);
      }}
      size="80%"
    >
      <div className="PostDetail">
        <div className="PostDetail-leftside">
          <img
            src={postData.image}
            alt=""
            className="PostDetail-leftside-img"
          />
        </div>
        <div className="PostDetail-rightside">
          <hr />
          <div className="PostDetail-info-wrapper">
            <div className="PostDetail-info-left">
              <Link to={`/profile/${userData?._id}`} style={{ fontSize: "0" }}>
                <img
                  src={userData?.profileImg || avatar}
                  alt=""
                  className="PostDetail-info-profileImg"
                />
              </Link>
              <div className="PostDetail-info">
                <span className="PostDetail-info-name">
                  <Link to={`/profile/${userData?._id}`}>
                    {userData.username}
                  </Link>
                </span>
              </div>
            </div>
            <div
              className="PostDetail-info-right"
              ref={refOpenAnother}
              onClick={() => setOpened((prev) => !prev)}
            >
              <img src={another} alt="another" className="icon" />
            </div>

            <div
              className="PostDetail-another"
              style={{ display: opened ? "block" : "none" }}
            >
              <div className="PostDetail-another-wrapper">
                <div className="PostDetail-another-menu" onClick={onHandleEditPost}>
                  <img src={updatePost} alt="update" className="icon" />
                  <span>Edit Post</span>
                </div>
                <hr />
                <div className="PostDetail-another-menu" onClick={handleDeletePost}>
                  <img src={deletePostImg} alt="update" className="icon" />
                  <span>Delete Post</span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="PostDetail-desc">
            <div className="PostDetail-desc-wrapper">
              <div className="PostDetail-desc-img">
                <Link
                  to={`/profile/${userData?._id}`}
                  style={{ fontSize: "0" }}
                >
                  <img
                    src={userData?.profileImg || avatar}
                    className="PostDetail-desc-img-inner"
                    alt=""
                  />
                </Link>
              </div>
              <div className="PostDetail-desc-info-wrapper">
                <div className="PostDetail-desc-info">
                  <div className="PostDetail-desc-info-inline">
                    <div className="PostDetail-desc-username-wrapper">
                      <span className="PostDetail-desc-username">
                        <Link to={`/profile/${userData?._id}`}>
                          {userData.username}&nbsp;
                        </Link>
                      </span>
                    </div>
                  </div>
                  <div className="PostDetail-desc-text-wrapper">
                    <span className="PostDetail-desc-text">
                      {postData.desc}
                    </span>
                  </div>
                </div>
                <div className="PostDetail-desc-time">
                  <span className="PostDetail-desc-time-inner">
                    {format(postData.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
            <div className="PostDetailComment-wrapper">
            {listComment.map((comment, idx) => (
            <div className="PostDetail-desc" key={idx}>
              <div className="PostDetail-desc-wrapper">
                <div className="PostDetail-desc-img">
                  <Link
                    to={`/profile/${comment?.userId}`}
                    style={{ fontSize: "0" }}
                  >
                    <img
                      src={comment?.avatarImg || avatar}
                      className="PostDetail-desc-img-inner"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="PostDetail-desc-info-wrapper">
                  <div className="PostDetail-desc-info">
                    <div className="PostDetail-desc-info-inline">
                      <div className="PostDetail-desc-username-wrapper">
                        <span className="PostDetail-desc-username">
                          <Link to={`/profile/${comment?.userId}`}>
                            {comment.username}&nbsp;
                          </Link>
                        </span>
                      </div>
                    </div>
                    <div className="PostDetail-desc-text-wrapper">
                      <span className="PostDetail-desc-text">
                        {comment.text}
                      </span>
                    </div>
                  </div>
                  <div className="PostDetail-desc-time">
                    <span className="PostDetail-desc-time-inner">
                      {format(comment.timeCreated)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
            </div>
            <hr />
          <div className="PostDetail-react">
            <div className="PostDetail-react-img">
              <img
                src={liked ? love : unlove}
                alt=""
                onClick={handleLike}
                className="icon"
              />
              <img src={comment} alt="" className="icon" />
              <img src={share} alt="" className="icon" />
            </div>
            <div className="PostDetail-length-wrapper">
              <span className="PostDetail-length">{likes} likes</span>
              <span className="PostDetail-length">
                {listComment.length} comments
              </span>
            </div>
          </div>
          <hr />
          <div className="PostDetail-comment-chat">
        <div className="PostDetail-comment-user">
          <img src={user?.profileImg || avatar} />
          <div className="input-Width">
          <InputEmoji
            value={cmtText}
            onChange={setCmtText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Write a comment..."
          />
          </div>
        </div>
      </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostDetail;
