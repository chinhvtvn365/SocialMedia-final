import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../Redux/Actions/UserActions";
import Loading from "../LoadingError/Loading";
import Message from "./../LoadingError/Error";
import Person from "./../Person/Person";
import "./FollowerCard.css";
const FollowerCard = () => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const { user } = userInfo;
  const allUser = useSelector((state) => state.getAllUser);
  const { loading, error, allUserInfo } = allUser;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPerson = async () => {
      await dispatch(getAllUser());
    };
    fetchPerson();
  }, [user]);
 
  return (
    <div className="FollowerCard">
      <h3>People you may know</h3>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger" >{error}</Message> 
      ) : (
        <>
          {allUserInfo.map((person, id) => {
            if (user._id !== person._id) {
              return <Person user={person} userData={user} key={id} location="timeline"/>;
            }
          })}
        </>
      )}
    </div>
  );
};

export default FollowerCard;
