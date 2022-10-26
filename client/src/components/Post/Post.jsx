import React, { useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { format } from "timeago.js";
import avatar from "../../img/avatar.jpg";
import comment from "../../img/comment.png";
import love from "../../img/love.png";
import share from "../../img/share.png";
import unlove from "../../img/unlove.png";
import another from "../../img/another.png";
import updatePost from "../../img/update.png";
import deletePostImg from "../../img/delete.png";
import { getUserById } from "../../Redux/Actions/UserActions";
import {
  commentPost,
  deletePost,
  likePost,
} from "./../../Redux/Actions/PostActions";
import { Link } from "react-router-dom";
import "./Post.css";
import PostDetail from "../PostDetail/PostDetail";
import { GLOBALTYPE } from "../../Redux/Actions/GlobalType";

const Post = ({ postData, user }) => {
  const dispatch = useDispatch();
  const refAnother = useRef(null);
  const [modal, setModal] = useState(false);
  const [liked, setLiked] = useState(postData.likes.includes(user._id));
  const [likes, setLikes] = useState(postData.likes.length);
  const [userData, setUserData] = useState({});
  const [cmtText, setCmtText] = useState("");
  const [opened, setOpened] = useState(false);
  const [listComment, setListComment] = useState(postData.comments);
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 3000,
  };
  const handleLike = async () => {
    setLiked((prev) => !prev);
    dispatch(likePost(postData._id, { userCurrentId: user._id }));
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  useEffect(() => {
    const getUserPost = async () => {
      const { data } = await getUserById(postData.userId);
      setUserData(data);
    };
    getUserPost();
  }, []);

  const handleClickOutside = (event) => {
    if (refAnother.current && !refAnother.current.contains(event.target)) {
      setOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleDeletePost = () => {
    if (user._id === postData.userId) {
      dispatch(deletePost(postData._id));
    } else {
      return toast.error("Invalid action!", ToastObjects);
    }
  };
  const handleEditPost = () => {
    if (user._id === postData.userId) {
      dispatch({type: GLOBALTYPE.STATUS, payload: {...postData, onEdit: true}})
    } else {
      return toast.error("Invalid action!", ToastObjects);
  }}
  
  const handleOnEnter = async () => {
    const newComment = {
      userId: user._id,
      username: user.username,
      avatarImg: user?.profileImg,
      text: cmtText,
      timeCreated: new Date().toISOString()
      
    };
    const { data } = await commentPost(postData._id, newComment);
    setListComment(data);
  };
  return (
    <div className="Post">
      <div className="Post-header">
        <div className="Post-header-wrapper">
          <Link to={`/profile/${userData?._id}`} style={{ fontSize: "0" }}>
            <img src={userData?.profileImg || avatar} alt="avatar"/>
          </Link>
          <div className="Post-header-info">
            <span className="Post-header-info-name">
              <Link to={`/profile/${userData?._id}`}>{userData?.username}</Link>
            </span>
            <span className="Post-header-info-time">
              {format(postData.createdAt)}
            </span>
          </div>
        </div>
        <div
          className="Post-header-another"
          ref={refAnother}
          onClick={() => setOpened((prev) => !prev)}
        >
          <img src={another} alt="another" />
        </div>
        <div
          className="Post-header-another-fun"
          style={{ display: opened ? "block" : "none" }}
        >
          <div className="Post-header-another-fun-wrapper">
            <div className="Post-header-another-menu" onClick={handleEditPost}>
              <img src={updatePost} alt="update" />
              <span>Edit Post</span>
            </div>
            <hr />
            <div
              className="Post-header-another-menu"
              onClick={handleDeletePost}
            >
              <img src={deletePostImg} alt="update" />
              <span>Delete Post</span>
            </div>
          </div>
        </div>
      </div>
      <div className="Post-desc">
        <span>{postData.desc}</span>
      </div>
      <img src={postData.image} alt="" onClick={() => setModal(true)} />
      <div className="Post-react">
        <div className="Post-react-img">
          <img src={liked ? love : unlove} alt="" onClick={handleLike} />
          <img src={comment} alt="" />
          <img src={share} alt="" />
        </div>
        <div className="Post-length-wrapper">
          <span className="Post-length">{likes} likes</span>
          <span className="Post-length">{listComment.length} comments</span>
        </div>
      </div>
      <div className="Post-comment-chat">
        <div className="Post-comment-user">
          <img src={user?.profileImg || avatar} alt="avatar"/>
          <InputEmoji
            value={cmtText}
            onChange={setCmtText}
            cleanOnEnter
            onEnter={handleOnEnter}
            placeholder="Write a comment..."
          />
        </div>
      </div>
      <div className="Post-comment">
        {listComment.map((comment, idx) => (
          <div className="Post-comment-list" key={idx}>
            <Link to={`/profile/${comment?.userId}`}>
              <img src={comment?.avatarImg || avatar} alt="" />
            </Link>
            <div className="Post-comment-list-info">
              <span>
                <Link to={`/profile/${comment?.userId}`}>
                  {comment.username}
                </Link>
              </span>
              <span>{comment.text}</span>
            </div>
          </div>
        ))}
      </div>
      <PostDetail
        modal={modal}
        setModal={setModal}
        postData={postData}
        userData={userData}
        liked={liked}
        handleLike={handleLike}
        likes={likes}
        listComment={listComment}
        user={user}
        cmtText={cmtText}
        setCmtText={setCmtText}
        handleOnEnter={handleOnEnter}
        handleDeletePost={handleDeletePost}
        handleEditPost={handleEditPost}
      />
    </div>
  );
};

export default Post;
