import React from 'react'
import ProfileCard from '../ProfileCard/ProfileCard'
import "./ProfileSide.css"
import FollowerCard from './../FollowerCard/FollowerCard';

const ProfileSide = () => {

  return (
    <div className="ProfileSide"> 
      <ProfileCard />
      <FollowerCard />
    </div>
  )
}

export default ProfileSide