export const postCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "POST_CREATE_REQUEST":
      return { loading: true };
    case "POST_CREATE_SUCCESS":
      return { loading: false, post: action.payload };
    case "POST_CREATE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const postUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "POST_UPDATE_REQUEST":
      return { loading: true };
    case "POST_UPDATE_SUCCESS":
      return { loading: false, ResMess: action.payload };
    case "POST_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const postDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_POST_SUCCESS":
      return {postDel: action.payload };
    default:
      return state;
  }
};
export const getTimelinePostReducer = (state = { posts: []}, action) => {
switch (action.type) {
  case "GET_TIMELINE_REQUEST":
    return { loading: true, posts: [] };
  case "GET_TIMELINE_SUCCESS":
    return { loading: false, posts: action.payload };
    // case "CREATE_POST_SUCCESS":
    //   return { ...state, posts: [action.payload, ...state.posts]};
    // case "POST_DELETE_SUCCESS":
    //   return { ...state, posts: [...state.posts.filter((post) => post._id !== action.payload)] };
  case "GET_TIMELINE_FAIL":
    return { loading: false, error: action.payload };
  default:
    return state;
}
};
export const getPostUserByIdReducer = (state = { postUser: []}, action) => {
switch (action.type) {
  case "GET_POST_REQUEST":
    return { loadingPost: true, postUser: [] };
  case "GET_POST_SUCCESS":
    return { loadingPost: false, postUser: action.payload };
    // case "CREATE_POST_SUCCESS":
    //   return { ...state, postUser: [action.payload, ...state.postUser]};
    // case "POST_DELETE_SUCCESS":
    //   return { ...state, postUser: [...state.postUser.filter((post) => post._id !== action.payload)] };
  case "GET_POST_FAIL":
    return { loadingPost: false, errorPost: action.payload };
  default:
    return state;
}
};