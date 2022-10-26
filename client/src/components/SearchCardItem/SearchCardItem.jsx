import React from 'react'
import "./SearchCardItem.css"
import avatar from "../../img/avatar.jpg";
import { useDispatch } from "react-redux";
import { getUserBySearch } from "../../Redux/Actions/UserActions";
const SearchCardItem = ({user}) => {
  const dispatch = useDispatch();
  return (
    <div className="SearchCardItem" onClick={() => dispatch(getUserBySearch(null))}>
      <img src={user.profileImg || avatar} alt="" />
      <div className="SearchCardItem-info">
        <span>{user.username}</span>
        <span>{user.firstname} {user.lastname}</span>
      </div>
    </div>
  )
}

export default SearchCardItem