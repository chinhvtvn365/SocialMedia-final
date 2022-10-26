import React, { useState } from "react";
import { useDispatch } from "react-redux";
import avatar from "../../img/avatar.jpg";
import { followUser, unfollowUser } from "./../../Redux/Actions/UserActions";
import "./Person.css";
import { Link } from "react-router-dom";
function Person({ user, userData, setOpenModal, userParams}) {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(
    userData.following.includes(user._id)
  );

  const handleFollow = async () => {
    // if (!userParams) {
    //   if (following) {
    //     await dispatch(unfollowUser(user._id, userData));
    //     if(location === "timeline"){
    //       setFollowing((prev) => !prev);
    //     }
    //   } else {
    //     await dispatch(followUser(user._id, userData));
    //     setFollowing((prev) => !prev);
    //   }
    // } else {
    //   if (following) {
    //     await dispatch(unfollowUser(user._id, userData));
    //     if (userParams !== userData._id) {
    //       setFollowing((prev) => !prev);
    //     }
    //   } else {
    //     await dispatch(followUser(user._id, userData));
    //     setFollowing((prev) => !prev);
    //   }
    // }
      if(following){
        await dispatch(unfollowUser(user._id, userData))
        if(userParams !== userData._id){
          setFollowing((prev) => !prev);
        }
      }
      else{
        await dispatch(followUser(user._id, userData));
        setFollowing((prev) => !prev);
    };
  };
  // following
  //   ? await dispatch(unfollowUser(user._id, userData))
  //   : await dispatch(followUser(user._id, userData));
  // setFollowing((prev) => !prev);

  return (
    <div className="Person">
      <div className="Person-info">
        <Link to={`/profile/${user?._id}`} onClick={() => setOpenModal(false)}>
          <img src={user.profileImg || avatar} alt="" className="Person-img" />
        </Link>
        <div className="Person-name">
          <span>
            {" "}
            <Link
              to={`/profile/${user?._id}`}
              onClick={() => setOpenModal(false)}
            >
              {user.username}
            </Link>
          </span>
          <span>
            {user.firstname} {user.lastname}
          </span>
        </div>
      </div>
      {userData._id !== user._id && (
        <button
          className={
            following
              ? "Person-button button warning-button"
              : "Person-button button"
          }
          onClick={handleFollow}
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
}

export default Person;
