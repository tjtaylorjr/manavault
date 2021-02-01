import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import CommentBox from "../social/CommentBox.js";
import Comment from "../social/Comment.js";
import DeckCardObject from "./DeckCardObject.js";
import DeckObject from "./DeckObject.js";
import { AiFillDislike, AiFillLike, } from 'react-icons/ai';

const DeckViewer = (props) => {
  const [user, setUser] = useState({}); //needed for current user's avatar
  const [avatar, setAvatar] = useState("");
  const [comments, setComments] = useState([]);
  const [postFlag, setPostFlag] = useState(false);
  const [isVIP, setIsVIP] = useState("");
  const [mainDeck, setMainDeck] = useState([]);
  const [sideboard, setSideboard] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const {data} = location.state;  //save the deck object in state to variable
  const deck_id = data.id;
  const creator = data.creator_name;
  const deckName = data.deck_name;
  const {id, username} = props.user;

  useEffect(() => {
    if (!id) {
      return
    }
    setIsLoaded(false);
    (async () => {
      const response = await fetch(`/api/users/${id}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [id]);

  useEffect(() => {
    if (Object.keys(user).length === 12) {
      const avatar_img = user.info.avatar;
      const VIP = user.info.VIP;
      setAvatar(avatar_img);
      setIsVIP(VIP);
      setIsLoaded(true);
    }
  }, [user])

  useEffect(() => {
    (async() => {
      const res = await fetch(`/api/comments/${deck_id}`);
      const commentList = await res.json()
      if(commentList) {
        console.log(commentList)
        setComments(commentList.comments)
      }
    })()
    setPostFlag(false)
  },[deck_id, postFlag])

  console.log(data);
  useEffect(() => {
    let main = []
    let side = []
    data.card_list.forEach((card) => {
      if (card.in_deck > 0) {
        main.push(card)
      } else {
        side.push(card)
      }
    })

    setMainDeck(main);
    setSideboard(side);
  },[data])
  return isLoaded ? (
    <>
      <div className="deckviewer">
        <div className="deckviewer__header">
          {isVIP &&
            <div className="deckviewer__VIP-user-panel-background">
              <div className="deckviewer__VIP-user-panel-background-wrapper">
                <div className="deckviewer__VIP-user-panel-background-image" style={{ backgroundImage: `url(${data.background_img})` }}></div>
              </div>
              <div className="deckviewer__VIP-user-panel-gradient"></div>
            </div>
          }
          <div className="deckviewer__navbar-background"></div>
          <div className="deckviewer__buffer"></div>
          <div className="deckviewer-header__main">
            <div className="deckviewer-header__deck-panel" >
              <div className="deckviewer-header__deck-panel-name" >{data.deck_name.toUpperCase()}</div>
              <div className="deckviewer-header__deck-panel-attribution" >
                by {data.creator_name}
              </div>
              <div className="deckviewer-header__deck-description">
                <p>{data.description}</p>
              </div>
            </div>
          </div>
          <div className="deckviewer-header__lower-panel"></div>
        </div>
        <div className="deckviewer__body">
          <div className="deckviewer__deck-container">
            <div className="deckviewer__main-container">{mainDeck.length > 0 && mainDeck.map((card, i) => (
              <DeckCardObject key={i} data={card}/>
            ))}</div>
            <div className="deckviewer__side-container"></div>
          </div>
          <div className="deckviewer__comments-container">
            <div className="deckviewer__comments-wrapper">
              <CommentBox setPostFlag={setPostFlag} authenticated={props.authenticated} user_id={id} username={username} creator={creator} deckName={deckName} deck_id={deck_id}/>
              {comments.map((comment, i) => (
                <Comment key={i} authenticated={props.authenticated} user={props.user} comment={comment}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
      <>
        <div className="deckviewer"></div>
      </>
    )
}

export default DeckViewer;
