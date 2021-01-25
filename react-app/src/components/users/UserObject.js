import React from 'react';
import { useHistory } from 'react-router-dom';
import defaultAvatarIMG from  '../../assets/images/avatars/faceless-walker.png';

const UserObject = (user) => {
  const {data} = user
  const avatarIMG = data.avatar;
  const history = useHistory();
  const renderUserProfile = () => {
    history.push(`/users/${data.id}`)
  }

  return (
    <>
      <div className="user-object" onClick={renderUserProfile}>
        <div className="user-object__avatar-container">
          <div className="user-object__avatar-image-wrapper">
            {avatarIMG? (
              <div className="user-object__avatar-image" style={{backgroundImage:`url(${avatarIMG})`}}></div>
            ) : (
              <div className="user-object__avatar-image" style={{backgroundImage:` url(${defaultAvatarIMG})`}}></div>
            )}
          </div>
        </div>
        <p className="user-object__username">{data.username}</p>
      </div>
    </>
  )
}

export default UserObject;
