export const getAllBoxChatReducer = (state = {boxInfo: []}, action) => {
    switch (action.type) {
      case "GET_BOX_REQUEST":
        return { loading: true, boxInfo: [] };
      case "GET_BOX_SUCCESS":
        return { loading: false, boxInfo: action.payload };
        case "CREATE_BOX_SUCCESS":
        return {...state, boxInfo: [action.payload, ...state.boxInfo] };
      case "GET_BOX_FAIL":
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
