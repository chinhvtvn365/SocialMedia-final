import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import InfoCard from "../../components/InfoCard/InfoCard";
import PostCreate from "../../components/PostCreate/PostCreate";
import Posts from "../../components/Posts/Posts";
import avatar from "../../img/avatar.jpg";
import coverImg from "../../img/coverImg.jpg";
import { createBox } from "../../Redux/Actions/MessageAction";
import { getPostUser } from "./../../Redux/Actions/PostActions";
import { getAllUser, getUserById } from "./../../Redux/Actions/UserActions";
import { useNavigate } from "react-router-dom";
import { getAllBox } from "./../../Redux/Actions/MessageAction";
import "./Profile.css";
import FollowerModal from "./../../components/FollowerModal/FollowerModal";
import FollowingModal from "./../../components/FollowingModal/FollowingModal";
const Profile = () => {
  const [profileUser, setProfileUser] = useState({
    followers: [],
    following: [],
  });
  const { user } = useSelector((state) => state.userLogin.userInfo);
  const { postUser } = useSelector((state) => state.getPostUserById);
  const { boxInfo } = useSelector((state) => state.getAllBoxChat);
  const { post } = useSelector((state) => state.postCreate);
  const { postDel } = useSelector((state) => state.postDelete);
  const { ResMess } = useSelector((state) => state.postUpdate)
  const [openModalFollower, setOpenModalFollower] = useState(false);
  const [openModalFollowing, setOpenModalFollowing] = useState(false);
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const userId = params.id;
  useEffect(() => {
    const getAllUserPostById = async () => {
      await dispatch(getPostUser(userId));
    };
    getAllUserPostById();
  }, [dispatch, userId, post, postDel, ResMess]);

  useEffect(() => {
    const fetchProfileUser = async () => {
      const { data } = await getUserById(userId);
      setProfileUser(data);
    };
    fetchProfileUser();
  }, [user, userId]);

  useEffect(() => {
    try {
      const fetchBoxChat = async () => {
        await dispatch(getAllBox(user));
      };
      fetchBoxChat();
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    const fetchPerson = async () => {
      await dispatch(getAllUser());
    };
    fetchPerson();
  }, []);
  const handleSendMessage = async () => {
    if (boxInfo.some((a) => a.members.some((b) => b === userId))) {
      return navigate("/messages");
    } else {
      await dispatch(createBox(user._id, userId));
      return navigate("/messages");
    }
  };

  return (
    <div className="Profile">
      <Header />
      <div className="Profile-user-top">
        <div className="Profile-user-person">
          <img src={profileUser.coverImg || coverImg} alt="" />
          <div className="Profile-user-info">
            <img src={profileUser.profileImg || avatar} alt="" />
            <div className="Profile-user-name">
              <h1>{profileUser.username}</h1>
              <div className="Profile-user-postfl">
                <div className="Profile-user-fl">
                  <span>{postUser?.length || 0} </span>
                  <span> post</span>
                </div>
                <div
                  className="Profile-user-fl"
                  onClick={() => setOpenModalFollower(true)}
                >
                  <span>{profileUser.followers.length}</span>
                  <span> followers</span>
                </div>
                <div className="Profile-user-fl" onClick={() => setOpenModalFollowing(true)}>
                  <span>{profileUser.following.length}</span>
                  <span> following</span>
                </div>
              </div>
              <span>
                {profileUser.firstname} {profileUser.lastname}
              </span>
            </div>
            {user._id !== userId && (
              <div
                className="User-Sendmessage"
                style={{ alignSelf: "center", flex: "1", fontSize: "15px" }}
              >
                <button
                  className="button"
                  style={{ margin: "0 auto", padding: "10px 20px" }}
                  onClick={handleSendMessage}
                >
                  Send message{" "}
                  <i
                    className="fa-brands fa-facebook-messenger"
                    style={{ padding: "0 5px", marginTop: "1px" }}
                  ></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="Profile-user-bottom">
        <div className="Profile-Timeline">
          <div className="Profile-info">
            <InfoCard profileUser={profileUser} paramsId={userId} />
          </div>
          <div className="Profile-post">
            {user._id === userId && <PostCreate />}
            <Posts />
          </div>
        </div>
      </div>
      <FollowerModal
        openModalFollower={openModalFollower}
        setOpenModalFollower={setOpenModalFollower}
        user={user}
        userParams={userId}
        profileUser={profileUser}
      />
        <FollowingModal
        openModalFollowing={openModalFollowing}
        setOpenModalFollowing={setOpenModalFollowing}
        user={user}
        userParams={userId}
        profileUser={profileUser}
      />
    </div>
  );
};

export default Profile;
