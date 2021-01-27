import React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from "./Avatar";
// import defaultAvatar from  '../../assets/images/avatars/faceless-walker.png';

const UserObject = (user) => {
  const {data} = user
  const avatar = data.info.avatar;
  const defaultAvatar = "faceless-walker.png";
  const history = useHistory();
  const renderUserProfile = () => {
    history.push(`/users/${data.id}`)
  }
  console.log(avatar);
  return (
    <>
      <div className="user-object" onClick={renderUserProfile}>
        {avatar ? (
          <Avatar avatar={avatar} size={"MED"}/>
        ) : (
          <Avatar avatar={defaultAvatar} size={"MED"}/>
        )}
        <p className="user-object__username">{data.username}</p>
      </div>
    </>
  )
}

export default UserObject;
