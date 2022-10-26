import axiosClient from "../../api/axiosClient";
import valid from '../../utils/valid'

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const { data } = await axiosClient.post("/auth/login", {
      username,
      password,
    });
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
    
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (username, password, firstname, lastname) => async (dispatch) => {

    const check = valid(username, password, firstname, lastname)
    if(check.errLength > 0)
    return dispatch({  type: "USER_REGISTER_FAIL", payload: check.errMsg[Object.keys(check.errMsg)[0]] });

    try {
      dispatch({ type: "USER_REGISTER_REQUEST" });

      const { data } = await axiosClient.post("/auth/register", {
        username,
        password,
        firstname,
        lastname,
      });
      dispatch({ type: "USER_REGISTER_SUCCESS", payload: data });
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
};

export const getUserById = async (userId) => {
  try {
    return await axiosClient.get(`/user/getUser/${userId}`);
  } catch (error) {
    console.log(error.message);
  }
};
export const getAllUser = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_ALL_USER_REQUEST" });

    const { data } = await axiosClient.get("/user/getAllUser");
    dispatch({ type: "GET_ALL_USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "GET_ALL_USER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getUserBySearch = (textSearch) => async (dispatch) => {
  try {
    dispatch({ type: "SEARCH_USER_REQUEST" });

    const { data } = await axiosClient.get(`/user/search?name=${textSearch}`);
    dispatch({ type: "SEARCH_USER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "SEARCH_USER_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateUser = (userId, userData) => async (dispatch) => {
  try {
    dispatch({ type: "USER_UPDATE_REQUEST" });

    const { data } = await axiosClient.put(`/user/${userId}`, userData);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    dispatch({ type: "USER_UPDATE_SUCCESS", payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const followUser = (userId, userData) => async (dispatch, getState) => {
  try {
    await axiosClient.put(`/user/${userId}/follow`, userData);
    dispatch({ type: "FOLLOW_SUCCESS", payload: userId });
  } catch (error) {
    console.log(error.message);
  }
};
export const unfollowUser =
  (userId, userData) => async (dispatch, getState) => {
    try {
      await axiosClient.put(`/user/${userId}/unfollow`, userData);
      dispatch({ type: "UNFOLLOW_SUCCESS", payload: userId });
    } catch (error) {
        console.log(error.message);
  }}
