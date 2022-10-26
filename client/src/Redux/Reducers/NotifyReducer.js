export const notifyReducer = (state = { noti: [] }, action) => {
  switch (action.type) {
    case "GET_NOTIFY_SUCCESS":
      return { noti: action.payload };
    case "UPDATE_NOTIFY_SUCCESS":
      const newNoti = state.noti.map(item => (item._id === action.payload._id ? action.payload : item))
      return {...state, noti: newNoti}
    default:
      return state;
  }
};
