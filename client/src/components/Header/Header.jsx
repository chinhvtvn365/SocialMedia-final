import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../../img/avatar.jpg";
import darkmode from "../../img/darkmode.png";
import feedback from "../../img/feedback.png";
import home from "../../img/home.png";
import lightmode from "../../img/lightmode.png";
import logo from "../../img/logo.png";
import logoutButton from "../../img/logout.png";
import messenger from "../../img/messenger.png";
import nonotify from "../../img/nonotify.png";
import noti from "../../img/noti.png";
import Search from "../Search/Search";
import { logout } from "./../../Redux/Actions/UserActions";
import SearchCardItem from "./../SearchCardItem/SearchCardItem";
import { getNotify } from "../../Redux/Actions/NotifyAction";
import NotifyItem from "./../NotifyItem/NotifyItem";
import SearchSkeleton from "./../Skeleton/SearchSkeleton";
import "./Header.css";

const Header = () => {
  const [opened, setOpened] = useState(false);
  const [openedNoti, setOpenedNoti] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme"))
      : "light-theme";
  });



  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLogin.userInfo);
  const { users, loading } = useSelector((state) => state.searchUserResult);
  const notify = useSelector((state) => state.notify.noti);

  const ref = useRef(null);
  const refNoti = useRef(null);

  useEffect(() => {
    if (user) {
      dispatch(getNotify(user._id));
    }
  }, []);

  const handleToggleTheme = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
    } else {
      setTheme("light-theme");
    }
  };

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const handleOpen = () => {
    setOpened((prev) => !prev);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutsideNoti = (event) => {
    if (refNoti.current && !refNoti.current.contains(event.target)) {
      setOpenedNoti(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideNoti, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideNoti, true);
    };
  }, []);

  return (
    <header>
      <div className="header-left">
        <Link to="../timeline">
          <img src={logo} alt="logo" />
        </Link>
        <Search />
        {loading && (
          <div className="header-left-cardItem">
            <div className="header-left-cardItem-inner">
              <SearchSkeleton items={2} />
            </div>
          </div>
        )}
        {users.length > 0 && (
          <div className="header-left-cardItem">
            <div className="header-left-cardItem-inner">
              {users.map((userResult, idx) => (
                <Link
                  key={idx}
                  to={`/profile/${userResult._id}`}
                  style={{ color: "inherit" }}
                >
                  <SearchCardItem user={userResult} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="header-right">
        <div className="header-icon">
          <div className="header-icon-img">
            <Link to="../timeline">
              <img src={home} alt="" />
            </Link>
          </div>
          <div className="header-icon-img">
            <Link to="../messages">
              <img src={messenger} alt="" />
            </Link>
          </div>
          <div
            className="header-icon-img header-noti"
            ref={refNoti}
            onClick={() => setOpenedNoti((prev) => !prev)}
            style={{ backgroundColor: openedNoti ? "#83c9f7" : "" }}
          >
            <img src={noti} alt="noti" />
            {notify.filter((a) => a.isRead === false).length > 0 && (
              <div className="header-noti-length">
                <span className="header-noti-length-text">{notify.filter((a) => a.isRead === false).length}</span>
              </div>
            )}
          </div>
        </div>
        <div className="header-avatar" ref={ref} onClick={handleOpen}>
          <img src={user.profileImg || avatar} alt="" />
        </div>
        <div
          className="header-setting"
          style={{ display: openedNoti ? "block" : "none" }}
        >
          <div className="header-noti-modal">
            <h1>Notify</h1>
            {notify.length === 0 ? (
              <div className="header-noti-no">
                <h3>Your notifications will appear here</h3>
                <img src={nonotify} alt="nonoti" />
              </div>
            ) : (
              <>
                <div className="header-noti-button"></div>
                {notify.filter((a) => a.isRead === false).length > 0 && (
                <div className="header-noti-time">
                  <span>New</span>
                </div>
                )}
                <div className="header-noti-item-wrapper">
                  {notify
                    .filter((filterData) => filterData.isRead === false)
                    .map((data, idx) => (
                      <NotifyItem data={data} key={idx} />
                    ))}
                </div>
                {notify.filter((a) => a.isRead === true).length > 0 && (
                <div className="header-noti-time">
                  <span>Before</span>
                </div>)}
                <div className="header-noti-item-wrapper read-noti-color">
                  {notify
                    .filter((filterData) => filterData.isRead === true)
                    .map((data, idx) => (
                      <NotifyItem data={data} key={idx} />
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className="header-setting"
          style={{ display: opened ? "block" : "none" }}
        >
          <div className="header-setting-inner">
            <Link to={`/profile/${user._id}`}>
              <div className="header-avatar">
                <img src={user.profileImg || avatar} alt="" />
                <span className="header-info">{user.username}</span>
              </div>
            </Link>
            <div className="header-menu" onClick={handleToggleTheme}>
              <div className="header-menu-innerImg">
                <img
                  src={theme === "light-theme" ? darkmode : lightmode}
                  alt=""
                />
              </div>
              <span>
                {theme === "light-theme" ? "Dark Mode" : "Light Mode"}
              </span>
            </div>
            <div className="header-menu">
              <div className="header-menu-innerImg">
                <img src={feedback} alt="" />
              </div>
              <span>Give Feedback</span>
            </div>
            <div className="header-menu" onClick={handleLogout}>
              <div className="header-menu-innerImg">
                <img src={logoutButton} alt="" />
              </div>
              <span>Log out</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
