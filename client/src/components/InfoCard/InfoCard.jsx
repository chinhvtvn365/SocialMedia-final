import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileModal from "./../ProfileModal/ProfileModal";
import "./InfoCard.css";
const InfoCard = ({profileUser, paramsId}) => {
  const [modal, setModal] = useState(false);

  // const params = useParams();
  const { user } = useSelector((state) => state.userLogin.userInfo);

  // const userId = params.id; // lấy id profile bằng useParams
  // const [profileUser, setProfileUser] = useState({});

  // useEffect(() => {
  //   const fetchProfileUser = async () => {
  //     if (userId === user._id) {
  //       setProfileUser(user);
  //     } else {
  //       // const profileUserbyId = await dispatch(getUserById(userId));
  //       // setProfileUser(profileUserbyId);
  //     }
  //   };
  //   fetchProfileUser();
  // }, [user]);

  return (
    <div className="InfoCard">
      <div className="InfoCard-intro">
        <h3>{user._id === paramsId ? "Your information" : "Information"}</h3>
      </div>
      <div className="InfoCard-info">
        <i className="fa-solid fa-face-smile"></i>
        <span>Status </span>
        <span>{profileUser.relationship || "..."}</span>
      </div>
      <div className="InfoCard-info">
        <i className="fa-solid fa-house"></i>
        <span>Live in </span>
        <span>{profileUser.live || "..."}</span>
      </div>
      <div className="InfoCard-info">
        <i className="fa-solid fa-graduation-cap"></i>
        <span>Study at </span>
        <span>{profileUser.school || "..."}</span>
      </div>
      {user._id === paramsId && (
        <>
          <button
            className="InfoCard-edit button"
            onClick={() => setModal(true)}
          >
            <i className="fa-solid fa-pen"></i>Edit details
          </button>
          <ProfileModal modal={modal} setModal={setModal} data={user} userId={paramsId}/>
        </>
      )}
    </div>
  );
};

export default InfoCard;
