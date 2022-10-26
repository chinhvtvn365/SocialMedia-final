import axiosClient from "../../api/axiosClient";
import { GLOBALTYPE } from "./GlobalType";

export const createNotify = (msg) => async (dispatch) => {
  try {
    await axiosClient.post("/notify", msg);
  } catch (error) {
    dispatch({
      type: GLOBALTYPE.ALERT,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getNotify = (userId) => async (dispatch) => {
  try {
    const { data } = await axiosClient.get(`/notify/${userId}`);
    dispatch({ type: "GET_NOTIFY_SUCCESS", payload: data})
  } catch (error) {
    dispatch({
      type: GLOBALTYPE.ALERT,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const isReadNoti = (data) => async (dispatch) => {
    try {
      await axiosClient.put(`/notify/${data._id}`);
      dispatch({ type: "UPDATE_NOTIFY_SUCCESS", payload: {...data, isRead: true}})
    } catch (error) {
      dispatch({
        type: GLOBALTYPE.ALERT,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
};
