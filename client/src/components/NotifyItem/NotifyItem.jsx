import React from 'react'
import "./NotifyItem.css"
import avatar from "../../img/avatar.jpg";
import { format } from "timeago.js";
import { isReadNoti } from './../../Redux/Actions/NotifyAction';
import { useDispatch } from 'react-redux';

const NotifyItem = ({data}) => {
  const dispatch = useDispatch();
  const handleReadNoti = () => {
    if(data.isRead === false) {
      dispatch(isReadNoti(data))
    }
    else {
      return 
    }
  }
  return (
    <div className="Notify" onClick={handleReadNoti}>
    <div className="Notify-avatar-wrapper">
      <img className="Notify-avatar" src={data.userId.profileImg || avatar} alt="avatarImg" />
    </div>
    <div className="Notify-right">
    <div className="Notify-desc">
      <div className="Notify-info-wrapper">
        <div className="Notify-info">
          <span>{data.userId.username}</span>
        </div>
        <div className="Notify-text">
          <span>
            :&nbsp;{data.desc}
          </span>
        </div>
      </div>
      <div className="Notify-time">
        <span>{format(data.createdAt)}</span>
      </div>
    </div>
    <div className="Notify-img-wrapper">
    <img className="Notify-img" src={data.image} alt="img" />
    </div>
    </div>
  </div>
  )
}

export default NotifyItem