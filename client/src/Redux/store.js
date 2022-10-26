import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose
} from "redux";
import thunk from "redux-thunk";

import { userLoginReducer, userRegisterReducer, userUpdateReducer, getAllUserReducer, searchUserResultReducer} from "./Reducers/UserReducers";
import { getTimelinePostReducer, postCreateReducer, getPostUserByIdReducer, postDeleteReducer, postUpdateReducer } from './Reducers/PostReducers';
import { getAllBoxChatReducer } from './Reducers/MessageReducer';
import statusReducer from './Reducers/StatusReducer';
import { notifyReducer } from './Reducers/NotifyReducer';

// function saveToLocalStorage(store) {
//   try {
//     const serializedStore = JSON.stringify(store);
//     window.localStorage.setItem("store", serializedStore);
//   } catch (e) {
//     console.log(e);
//   }
// }

// function loadFromLocalStorage() {
//   try {
//     const serializedStore = window.localStorage.getItem("store");
//     if (serializedStore === null) return undefined;
//     return JSON.parse(serializedStore);
//   } catch (e) {
//     console.log(e);
//     return undefined;
//   }
// }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


  const persistedState = {
    userLogin: { userInfo: userInfoFromLocalStorage },
  }

const reducers = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  postCreate: postCreateReducer,
  postTimeline: getTimelinePostReducer,
  userUpdate: userUpdateReducer,
  getAllUser: getAllUserReducer,
  // followUser: followUserReducer,
  // unfollowUser: unfollowUserReducer,
  getAllBoxChat: getAllBoxChatReducer,
  // getUserById: getUserByIdReducer,
  getPostUserById: getPostUserByIdReducer,
  searchUserResult: searchUserResultReducer,
  postUpdate: postUpdateReducer,
  postDelete: postDeleteReducer,
  status: statusReducer,
  notify: notifyReducer,
});

const store = createStore(
  reducers,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);

// store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
