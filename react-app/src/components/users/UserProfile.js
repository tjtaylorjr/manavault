import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeckObject from "../decks/DeckObject";
import Avatar from "./Avatar";

const UserProfile = (props) => {
  const [user, setUser] = useState({});
  const [decks, setDecks] = useState([]);
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

  useEffect(() => {
    if(Object.keys(user).length === 12) {
      const avatar = user.info.avatar;
      const VIP = user.info.VIP;
      const decks = user.decks;
      setAvatar(avatar);
      setIsVIP(VIP);
      setDecks(decks);
      setIsLoaded(true);
    }
  },[user])

  if (!user) {
    return null;
  }

  return isLoaded ? (
    <>
      <div className="user-profile">
        <div className="user-profile__header">
            <div className="user-profile__user-panel-background">
              <div className="user-profile__user-panel-background-wrapper">
                <div className="user-profile__user-panel-background-image" style={{ backgroundImage: `url(${user.info.background_img})` }}></div>
              </div>
              <div className="user-profile__user-panel-gradient"></div>
            </div>
          {/* <div className="user-profile__navbar-background"></div>
          <div className="user-profile__buffer"></div> */}
          <div className="user-profile__user-panel">
            <div className="user-profile__user-panel-info-container">
              <div className="user-profile__user-panel-info-container-header">
                {isVIP &&
                  <div className="user-profile__user-panel-info-container-VIP">VIP</div>
                }
                <div className="user-profile__user-panel-info-container-username">{user.username.toUpperCase()}</div>
              </div>
              <div className="user-profile__user-panel-info-container-additional">
              <div className="user-profile__user-panel-info-container-joindate">Member since {user.created_at.slice(8,11)} {user.created_at.slice(5,7)} {user.created_at.slice(12, 16)}</div>
                <div className="user-profile__user-panel-info-container-location">{user.info.location}</div>
              </div>
              <div>
                <div></div>
                <div></div>
              </div>
            </div>
            <Avatar avatar={avatar} isVIP={isVIP} size={"LRG"}/>
          </div>
          <div className="user-profile__user-panel-about-container">
            <p>{user.info.about}</p>
          </div>
          {/* <div className="user-profile__header-buffer">
          </div> */}
        </div>
        <div className="user-profile__body">
          <div className="user-profile__body-decks-container">
            <div className="user-profile__body-decks-wrapper">
              {decks.map((deck, i) => (
                <DeckObject key={i} data={deck} />
              ))}
            </div>
          </div>
          <div className="user-profile__body-stats-container"></div>
          {/* <div className="user-profile__body-comments-container"></div> */}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="user-profile"></div>
    </>
  )
}

export default UserProfile;
