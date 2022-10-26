import axiosClient from "../../api/axiosClient";
import { createNotify } from './NotifyAction';
import { getUserById } from "./UserActions";
import { toast } from "react-toastify";

export const createPost = (postData) => async (dispatch, getState) => {
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 3000,
  };
  try {
    dispatch({ type: "POST_CREATE_REQUEST" });

    const { data } = await axiosClient.post("/post", postData);
    dispatch({ type: "POST_CREATE_SUCCESS", payload: data });
    toast.success("Create success", ToastObjects);
    //dispatch({ type: "CREATE_POST_SUCCESS", payload: data });
    const {
      userLogin: { userInfo },
    } = getState();
    const followerArr = await getUserById(userInfo.user._id);
    
    const msg = {
      id: data._id,
      userId: data.userId,
      desc: data.desc,
      image: data.image,
      recipients: followerArr.data.followers
    }
    dispatch(createNotify(msg))
  } catch (error) {
    dispatch({
      type: "POST_CREATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updatePost = (postData, status) => async (dispatch) => {
    if(status.desc === postData.desc && status.image === postData.image) {
      return
    }
    const ToastObjects = {
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      autoClose: 3000,
    };
  try {
    dispatch({ type: "POST_UPDATE_REQUEST" });
    const { data } = await axiosClient.put(`/post/${postData.postId}`, postData);
    dispatch({ type: "POST_UPDATE_SUCCESS", payload: data });
    toast.success("Edit success", ToastObjects);
  } catch (error) {
    dispatch({
      type: "POST_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deletePost = (postId) => async (dispatch) => {
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 3000,
  };
  try {
    await axiosClient.delete(`/post/${postId}`);
    dispatch({ type: "DELETE_POST_SUCCESS", payload: postId });
    //dispatch({ type: "POST_DELETE_SUCCESS", payload: postId });
    toast.success("Delete success", ToastObjects);
  } catch (error) {
    console.log(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};
export const getTimelinePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_TIMELINE_REQUEST" });

    const { data } = await axiosClient.get(`/post/timeline/${id}`);
    dispatch({ type: "GET_TIMELINE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "GET_TIMELINE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPostUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_POST_REQUEST" });

    const { data } = await axiosClient.get(`/post/postuser/${userId}`);
    dispatch({ type: "GET_POST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "GET_POST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const likePost = (postId, userId) => async () => {
  try {
    await axiosClient.put(`/post/${postId}/like`, userId);
  } catch (error) {
    console.log(error.message);
  }
};

export const commentPost = async (id, comment) => {
  try {
    return await axiosClient.put(`/post/${id}/comment`, comment);
  } catch (error) {
    console.log(error.message);
  }
};
