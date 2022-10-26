import React, { useEffect, useState } from "react";
import { getUserById } from "../../Redux/Actions/UserActions";
import "./Box.css";
import avatar from "../../img/avatar.jpg";

const Box = ({ dataBox, userCurrentId, online }) => {
  const [userData, setUserData] = useState({});
  const userId = dataBox.members.find((id) => id !== userCurrentId);

// get user info
  useEffect(() => {
    try {
      const fetchUserData = async () => {
        const { data } = await getUserById(userId);
        setUserData(data);
      };
      fetchUserData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="Box">
      <div className="Box-info">
        <div className="Box-info-img">
          <img src={userData?.profileImg || avatar} alt="" />
          {online && <div className="Box-info-img-online"></div>}
        </div>
        <div className="Box-info-name">
          <span>{userData.username}</span>
          <span>{userData.firstname} {userData.lastname}</span>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Box;
