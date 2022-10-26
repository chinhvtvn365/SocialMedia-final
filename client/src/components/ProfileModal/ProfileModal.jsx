import { UilTimes } from "@iconscout/react-unicons";
import { Modal, useMantineTheme } from "@mantine/core";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "./../../Redux/Actions/UserActions";
import "./ProfileModal.css";
import uploadImage from './../../utils/uploadImg';
import { toast } from "react-toastify";


const ProfileModal = ({ modal, setModal, data, userId }) => {
  const theme = useMantineTheme();
  const dispatch = useDispatch();

  const { password, ...other } = data;
  const [formDataUser, setFormDataUser] = useState(other);
  const [imgProfile, setImgProfile] = useState(null);
  const [imgCover, setCoverImg] = useState(null);
  const toastId = useRef(null);
  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 3000,
  };


  const handleOnChange = (e) => {
    setFormDataUser({ ...formDataUser, [e.target.name]: e.target.value });
  };

  const validImg = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      event.target.name === "profileImg"
        ? setImgProfile(file)
        : setCoverImg(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formDataUser.firstname === "" || formDataUser.lastname === ""){
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Please fill the firstname or lastname completely!", Toastobjects);
      }
    }
    else{
      const userData = formDataUser;
    if (imgProfile) {
      const urlProfileImg = await uploadImage(imgProfile);
      userData.profileImg = urlProfileImg;
    }
    if (imgCover) {
      const urlCoverImg = await uploadImage(imgCover);
      userData.coverImg = urlCoverImg;
    }
    await dispatch(updateUser(userId, userData));
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.success("Profile Updated Success <3", Toastobjects);
    }
    setModal(false);
    }
  };
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modal}
      onClose={() => {
        setModal(false);
        setImgProfile(null);
        setCoverImg(null);
      }}
      closeOnClickOutside={false}
      centered={true}
      size="50%"
    >
      <form onSubmit={handleSubmit}>
        <div className="ProfileModal-form">
          <h2>Profile information</h2>
          <div className="ProfileModal-form-input">
            <input
              type="text"
              name="firstname"
              onChange={handleOnChange}
              value={formDataUser.firstname}
              placeholder="First name"
            />
            <input
              type="text"
              name="lastname"
              onChange={handleOnChange}
              value={formDataUser.lastname}
              placeholder="Last name"
            />
          </div>
          <div className="ProfileModal-form-inputStatus">
            <input
              type="text"
              name="relationship"
              onChange={handleOnChange}
              value={formDataUser.relationship || ""}
              placeholder="Status"
            />
          </div>
          <div className="ProfileModal-form-input">
            <input
              type="text"
              name="live"
              onChange={handleOnChange}
              value={formDataUser.live || ""}
              placeholder="Live at"
            />
            <input
              type="text"
              name="school"
              onChange={handleOnChange}
              value={formDataUser.school || ""}
              placeholder="Study at"
            />
          </div>
          <div className="ProfileModal-wrapimg">
            <div className="ProfileModal-img">
              Profile Image
              <input
                type="file"
                onChange={validImg}
                name="profileImg"
                accept="image/png, image/jpeg"
              />
              {imgProfile && (
                <div className="ProfileModal-img-preview">
                  <UilTimes onClick={() => setImgProfile(null)} />
                  <img src={URL.createObjectURL(imgProfile)} alt="" />
                </div>
              )}
            </div>
            <div className="ProfileModal-img">
              Cover Image
              <input
                type="file"
                onChange={validImg}
                name="coverImg"
                accept="image/png, image/jpeg"
              />
              {imgCover && (
                <div className="ProfileModal-img-preview">
                  <UilTimes onClick={() => setCoverImg(null)} />
                  <img src={URL.createObjectURL(imgCover)} alt="" />
                </div>
              )}
            </div>
          </div>
          <button className="button ProfileModal-button">Update</button>
        </div>
      </form>
    </Modal>
  );
};
export default ProfileModal;
