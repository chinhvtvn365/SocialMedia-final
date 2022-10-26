import React, { useState, useEffect } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./PostCreateModal.css";
import { useDispatch, useSelector } from "react-redux";
import DragDropFile from "./../DragDropFile/DragDropFile";
import { UilTimes } from "@iconscout/react-unicons";
import avatar from "../../img/avatar.jpg";
import uploadImage from "./../../utils/uploadImg";
import { createPost, updatePost } from "./../../Redux/Actions/PostActions";
import Loading from "../LoadingError/Loading";
import { GLOBALTYPE } from "../../Redux/Actions/GlobalType";

const PostCreateModal = ({ postModal, setPostModal, user }) => {
  const theme = useMantineTheme();
  const [image, setImage] = useState(null);
  const [reviewImg, setReviewImg] = useState(null);
  const {loading} = useSelector((state) => state.postCreate);
  const status = useSelector((state) => state.status);
  const [desc, setDesc] = useState("") 
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!image) {
      return alert("Please choose an image!");
    }
    const url = await uploadImage(image)

    const newPost = {
      userId: user._id,
      desc: desc,
      image: url,
    };
    if(status.onEdit){
      await dispatch(updatePost({...newPost, postId: status._id}, status));
    }
    else{
      await dispatch(createPost(newPost))}

    reset();
  };

  const reset = () => {
    setImage(null);
    setPostModal(false);
    setDesc("")
    if(status.onEdit){
      dispatch({type: GLOBALTYPE.STATUS, payload: false})
    }
  };

  useEffect(() => {
    if(status.onEdit){
      setPostModal(true)
      setImage(status.image);
      setReviewImg(status.image)
      setDesc(status.desc)
    }
  }, [status])

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={postModal}
      onClose={reset}
      closeOnClickOutside={false}
      title={status.onEdit ? "Edit Your Post" : "Create New Post"}
      centered={true}
      radius="12px"
      size="60%"
    >
      <div className="PostCreateModal">
        <div className="PostCreateModal-left">
          {image ? (
            <div className="PostCreateModal-left-img">
              <img src={reviewImg} alt="" />
              <div
                className="PostCreateModal-left-delete"
                onClick={() => setImage(null)}
              >
                <UilTimes />
              </div>
            </div>
          ) : (
            <div className="PostCreateModal-left-input-img">
              <DragDropFile setImage={setImage} setReviewImg={setReviewImg} />
            </div>
          )}
        </div>
        <div className="PostCreateModal-right">
          <hr />
          <div className="PostCreateModal-right-info">
            <img src={user.profileImg || avatar} alt="user" />
            <span>{user.username}</span>
          </div>
          {loading && <Loading />} 
          <div className="PostCreateModal-right-textarea-wrapper">
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="PostCreateModal-right-textarea"
              aria-label={`Hi ${user.lastname}, what are you thinking ?`}
              placeholder={`Hi ${user.lastname}, what are you thinking ?`}
              autoComplete="off"
              autoCorrect="off"
            ></textarea>
          </div>
          <hr />
          <div className="PostCreateModal-right-submit">
            <button
              className="button PostCreateModal-right-button"
              onClick={handleSubmit}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PostCreateModal;
