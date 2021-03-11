import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import DeckObject from "../decks/DeckObject";
import Avatar from "./Avatar";
import { IoHammer } from 'react-icons/io5';
import { RiHeartsLine } from 'react-icons/ri';
import { BsEye } from 'react-icons/bs';
import { FaRegComments } from 'react-icons/fa';
import wMana from "../../assets/images/symbols/white_mana.svg";
import uMana from "../../assets/images/symbols/blue_mana.svg";
import bMana from "../../assets/images/symbols/black_mana.svg";
import rMana from "../../assets/images/symbols/red_mana.svg";
import gMana from "../../assets/images/symbols/green_mana.svg";

const UserProfile = (props) => {
  const [user, setUser] = useState({});
  const [decks, setDecks] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [isVIP, setIsVIP] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { userId } = useParams();

  const history = useHistory();
  // console.log(userId)
  useEffect(() => {
    if (!userId) {
      return null;
    }
    setIsLoaded(false);
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);
  // console.log(Object.keys(user).length);
  useEffect(() => {
    if(Object.keys(user).length === 13) {
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
    history.push('/');
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
            <div className="user-profile__body-decks-container-header">
              <h1>Decks by {user.username}</h1>
              {parseInt(userId) === props.user.id && (
                <button alt="build" onClick={() => history.push("/decks/build")}>
                  <IoHammer />
                </button>
              )}
            </div>
            <div className="user-profile__body-decks-wrapper">
                {decks.map((deck, i) => (
                  <div className="user-profile__body-decks-result">
                    <div className="user-profile__deck-list-item-mana">
                      {deck.color_identity.indexOf('W') > -1 && <img src={wMana} alt="white mana" />}
                      {deck.color_identity.indexOf('U') > -1 && <img src={uMana} alt="blue mana" />}
                      {deck.color_identity.indexOf('B') > -1 && <img src={bMana} alt="black mana" />}
                      {deck.color_identity.indexOf('R') > -1 && <img src={rMana} alt="red mana" />}
                      {deck.color_identity.indexOf('G') > -1 && <img src={gMana} alt="green mana" />}
                    </div>
                    <h4>{deck.deck_name}</h4>
                    <p>{'by ' + deck.creator_name}</p>
                    <div className="user-profile__deck-list-item-indicators">
                      <div>
                        <BsEye style={{ fill: "#FF6000", margin: "0 5px" }} />
                        {deck.total_views}
                      </div>
                      <div style={{ color: "FF6000" }}>
                        <RiHeartsLine style={{ fill: "#FF6000", margin: "0 5px" }} />
                        {deck.total_likes}
                      </div>
                      <div>
                        <FaRegComments style={{ fill: "#FF6000", margin: "0 5px" }} />
                        {deck.total_comments}
                      </div>
                    </div>
                    <DeckObject data={deck} />
                  </div>
                ))}
            </div>
          </div>
          {/* <div className="user-profile__body-stats-container"></div> */}
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
