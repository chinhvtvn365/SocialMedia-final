import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePost } from "../../Redux/Actions/PostActions";
import PostCreate from "./../PostCreate/PostCreate";
import Posts from "./../Posts/Posts";
import "./PostSide.css";

const PostSide = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLogin.userInfo);
  const { post } = useSelector((state) => state.postCreate);
  const { postDel } = useSelector((state) => state.postDelete)
  const { ResMess } = useSelector((state) => state.postUpdate)
  useEffect(() => {
    dispatch(getTimelinePost(user._id));
  }, [dispatch, post, postDel, ResMess]);
  return (
    <div className="PostSide">
      <PostCreate />
      <Posts location="postTimeline" />
    </div>
  );
};

export default PostSide;
