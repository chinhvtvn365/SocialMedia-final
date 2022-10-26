import React from "react";
import "./FollowerModal.css";
import { Modal, useMantineTheme } from "@mantine/core";
import Person from "./../Person/Person";
import { useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "./../LoadingError/Error";

const FollowerModal = ({
  openModalFollower,
  setOpenModalFollower,
  user,
  userParams,
  profileUser,
}) => {
  const theme = useMantineTheme();
  const allUser = useSelector((state) => state.getAllUser);
  let { loading, error, allUserInfo } = allUser;


    allUserInfo = allUserInfo.filter((userList) =>
      profileUser?.followers.includes(userList._id)
    )


  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={openModalFollower}
      onClose={() => {
        setOpenModalFollower(false);
      }}
      size="30%"
    >
      <div className="FollowerModal">
        <div className="FollowerTitle">
          <span>Follower</span>
        </div>
        <hr />
        <div className="FollowerUser">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              {allUserInfo.map((person, id) => {
                return (
                  <Person
                    user={person}
                    userData={user}
                    key={id}
                    setOpenModal={setOpenModalFollower}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default FollowerModal;
