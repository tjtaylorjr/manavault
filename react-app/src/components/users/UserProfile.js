import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../stylesheets/userProfile.css";

const UserProfile = (props) => {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState("");
  const [isVIP, setIsVIP] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { userId } = useParams();
  useEffect(() => {
    if (!userId) {
      return
    }
    setIsLoaded(false);
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  console.log(user);
  useEffect(() => {
    if(Object.keys(user).length === 6) {
      const avatar = user.info.avatar;
      const VIP = user.info.VIP;
      setAvatar(avatar);
      setIsVIP(VIP);
      setIsLoaded(true);
    }
  },[user])

  if (!user) {
    return null;
  }
  console.log(isVIP)
  return isLoaded ? (
    <>
      <div className="user-profile">
        {isVIP &&
          <div className="user-profile__user-panel-background">
            <div className="user-profile__user-panel-background-wrapper">
              <div className="user-profile__user-panel-background-image" style={{ backgroundImage: `url(${user.info.background_img})` }}></div>
            </div>
          </div>
        }
        <div className="user-profile__navbar-background"></div>
        <div className="user-profile__buffer"></div>
        <div className="user-profile__user-panel">
          <div className="user-profile__user-panel-about-container">
            <p>{user.info.about}</p>
          </div>
          <div className="user-profile__user-panel-info-container">
            <div className="user-profile__user-panel-info-container-username">{user.username.toUpperCase()}</div>
            <div>
              <div></div>
              <div></div>
            </div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="user-profile__user-panel-avatar-container">
            <div className="user-profile__user-panel-avatar-wrapper">
              {/* <div className="user-profile_user-panel-avatar-image" style={{ backgroundImage: `url("${user.info.avatar}")` }}></div> */}
              <div className="user-profile__user-panel-avatar-image" style={{ backgroundImage: `url("/avatars/${avatar}")`}}></div>
            </div>
          </div>
        </div>
        <div className="user-profile__header-buffer"></div>
      </div>
    </>
  ) : (
    <>
      <div className="user-profile"></div>
    </>
  )
}

export default UserProfile;
