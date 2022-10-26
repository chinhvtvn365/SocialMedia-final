export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_LOGIN_REQUEST":
        return { loading: true };
      case "USER_LOGIN_SUCCESS":
        return { loading: false, userInfo: action.payload };
      case "USER_LOGIN_FAIL":
        return { loading: false, error: action.payload };
        case "FOLLOW_SUCCESS":
          localStorage.setItem("userInfo", JSON.stringify({...state.userInfo,  user:{...state.userInfo.user, following: [...state.userInfo.user.following, action.payload]}}));
          return {...state, userInfo: {...state.userInfo, user:{...state.userInfo.user, following: [...state.userInfo.user.following, action.payload]}} };
          case "UNFOLLOW_SUCCESS":
            localStorage.setItem("userInfo", JSON.stringify({...state.userInfo,  user:{...state.userInfo.user, following: [...state.userInfo.user.following.filter(personId => personId !== action.payload)]}}));
          return {...state, userInfo: {...state.userInfo, user:{...state.userInfo.user, following: [...state.userInfo.user.following.filter(personId => personId !== action.payload)]}} };
        case "USER_LOGOUT":
          return {}
      default:
        return state;
    }
  };

  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_REGISTER_REQUEST":
        return { loading: true };
      case "USER_REGISTER_SUCCESS":
        return { loading: false, userInfo: action.payload };
      case "USER_REGISTER_FAIL":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case "USER_UPDATE_REQUEST":
        return { loading: true };
      case "USER_UPDATE_SUCCESS":
        return { loading: false, userInfo: action.payload };
      case "USER_UPDATE_FAIL":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  // export const getUserByIdReducer = (state = {}, action) => {
  //   switch (action.type) {
  //     case "GET_USER_REQUEST":
  //       return { loading: true };
  //     case "GET_USER_SUCCESS":
  //       return { loading: false, userDataById: action.payload };
  //     case "GET_USER_FAIL":
  //       return { loading: false, error: action.payload };
  //     default:
  //       return state;
  //   }
  // };

  export const getAllUserReducer = (state = { allUserInfo: [] }, action) => {
    switch (action.type) {
      case "GET_ALL_USER_REQUEST":
        return { loading: true,  allUserInfo:[]};
      case "GET_ALL_USER_SUCCESS":
        return { loading: false, allUserInfo: action.payload };
      case "GET_ALL_USER_FAIL":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const searchUserResultReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case "SEARCH_USER_REQUEST":
        return { loading: true,  users: []};
      case "SEARCH_USER_SUCCESS":
        return { loading: false, users: action.payload };
      case "SEARCH_USER_FAIL":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  // export const followUserReducer = (state = {}, action) => {
  //   switch (action.type) {
  //     case "FOLLOW__USER_REQUEST":
  //       return { loading: true };
  //     case "FOLLOW__USER_SUCCESS":
  //       return { loading: false};
  //     case "FOLLOW__USER_FAIL":
  //       return { loading: false, error: action.payload };
  //     default:
  //       return state;
  //   }
  // };
  // export const unfollowUserReducer = (state = {}, action) => {
  //   switch (action.type) {
  //     case "FOLLOW__USER_REQUEST":
  //       return { loading: true };
  //     case "FOLLOW__USER_SUCCESS":
  //       return { loading: false};
  //     case "FOLLOW__USER_FAIL":
  //       return { loading: false, error: action.payload };
  //     default:
  //       return state;
  //   }
  // };

