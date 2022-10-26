import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../../img/avatar.jpg";
import coverImg from "../../img/coverImg.jpg";
import { getUserById } from "../../Redux/Actions/UserActions";
import "./ProfileCard.css";
import FollowerModal from './../FollowerModal/FollowerModal';
import FollowingModal from './../FollowingModal/FollowingModal';
const ProfileCard = () => {
  const [userData, setUserData] = useState(null);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const { user } = userInfo;
  const [openModalFollower, setOpenModalFollower] = useState(false);
  const [openModalFollowing, setOpenModalFollowing] = useState(false);

  useEffect(() => {
    const getDataUser = async () => {
      const { data } = await getUserById(user._id);
      setUserData(data);
    };
    getDataUser();
  }, [user]);
  return (
    <div className="ProfileCard">
      <div className="ProfileCard-img">
        <img src={userData?.coverImg ||coverImg} alt="" />
        <img src={userData?.profileImg || avatar} alt="" />
      </div>
      <div className="ProfileCard-name">
        <span>{userData?.username}</span>
        <span>
          {userData?.firstname} {userData?.lastname}
        </span>
      </div>
      <div className="ProfileCard-follow">
        <hr />
        <div>
          <div className="follow" onClick={() => setOpenModalFollower(true)}>
            <span>Followers</span>
            <span>{userData?.followers.length}</span>
          </div>
          <div className="line"></div>
          <div className="follow" onClick={() => setOpenModalFollowing(true)}>
            <span>Followings</span>
            <span>{userData?.following.length}</span>
          </div>
        </div>
        <hr />
      </div>
      <span>
        <Link to={`/profile/${userData?._id}`} className="ProfileCard-button">
          My Profile
        </Link>
      </span>
      <FollowerModal
        openModalFollower={openModalFollower}
        setOpenModalFollower={setOpenModalFollower}
        user={user}
        profileUser={userData}
      />
        <FollowingModal
        openModalFollowing={openModalFollowing}
        setOpenModalFollowing={setOpenModalFollowing}
        user={user}
        profileUser={userData}
        location="timeline"
      />
    </div>
  );
};

export default ProfileCard;
