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
  // const [isVIP, setIsVIP] = useState(false);
  const [mainDeck, setMainDeck] = useState([]);
  const [creatures0Or1, setCreatures0Or1] = useState([]);
  const [creatures2, setCreatures2] = useState([]);
  const [creatures3, setCreatures3] = useState([]);
  const [creatures4, setCreatures4] = useState([]);
  const [creatures5, setCreatures5] = useState([]);
  const [creatures6Plus, setCreatures6Plus] = useState([]);
  const [lands, setLands] = useState([]);
  const [spells0Or1, setSpells0Or1] = useState([]);
  const [spells2, setSpells2] = useState([]);
  const [spells3, setSpells3] = useState([]);
  const [spells4, setSpells4] = useState([]);
  const [spells5, setSpells5] = useState([]);
  const [spells6Plus, setSpells6Plus] = useState([]);
  const [sideboard, setSideboard] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const [deck, setDeck] = useState(location.state.data);
  //const deck = location.state.data;  //save the deck object in state to variable
  // const deck_id = deck.id;
  // const creator = deck.creator_name;
  // const deckName = deck.deck_name;
  const {id, username} = props.user;

  // console.log(deck); // what does my deck object look like?
  // console.log(props.user);
  useEffect(() => {
    if (!id) {
      setIsLoaded(false);
      return;
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
      // const VIP = user.info.VIP;
      setAvatar(avatar_img);
      // setIsVIP(VIP);
    }
  }, [user])

  useEffect(() => {
    (async() => {
      const res = await fetch(`/api/decks/${deck.id}/comments`);
      const commentList = await res.json()
      if(commentList) {
        // console.log(commentList)
        setComments(commentList.comments)
      }
    })()
    setPostFlag(false)
  },[deck.id, postFlag])


  useEffect(() => {
    let mounted = true;
    let main = []
    let side = []
    if (mounted) {
      deck.card_list.forEach((card) => {
        if (card.in_deck > 0) {
          main.push(card)
        } else {
          side.push(card)
        }
      })
    }

    setMainDeck(main);
    setSideboard(side);
    return () => mounted = false;
  },[deck])

  // console.log(mainDeck)
  // const indexResults = mainDeck.map(card => console.log(card.card.type.indexOf("Creature")));
  // const booleanResults = mainDeck.map(card => console.log((card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (card.card.type.indexOf("Creature") !== -1 || card.card.type.indexOf("Planeswalker" !== -1))));
  useEffect(() => {
    let mounted = true;
    if(mainDeck.length > 0 && mounted) {
      const mainCreature01 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (card.card.type.indexOf("Creature") != -1 || card.card.type.indexOf("Planeswalker" != -1))
      )

      const booleanResults = mainCreature01.forEach(card => console.log((card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))));

      const mainCreature2 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 2) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))
      )

      console.log(mainCreature01);
      console.log(mainCreature2);

      if(mainCreature01.length > 0) {
        setCreatures0Or1(mainCreature01)
      }

      if(mainCreature2) {
        setCreatures2(mainCreature2)
      }
    }

    // if (mainDeck.length > 0 && mounted) {
    //   const main2 = mainDeck.filter((card) =>
    //     (card.card.conv_mana_cost === 2) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))
    //   )
    //   console.log(main2);
    //   setCreatures2(main2)
    // }

    // if (mainDeck.length > 0 && mounted) {
    //   const main01 = mainDeck.filter((card) =>
    //     (card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))
    //   )
    //   console.log(main01);
    //   setCreatures0Or1(main01)
    // }

    // if (mainDeck.length > 0 && mounted) {
    //   const main01 = mainDeck.filter((card) =>
    //     (card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))
    //   )
    //   console.log(main01);
    //   setCreatures0Or1(main01)
    // }

    // if (mainDeck.length > 0 && mounted) {
    //   const main01 = mainDeck.filter((card) =>
    //     (card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))
    //   )
    //   console.log(main01);
    //   setCreatures0Or1(main01)
    // }

    // if (mainDeck.length > 0 && mounted) {
    //   const main01 = mainDeck.filter((card) =>
    //     (card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))
    //   )
    //   console.log(main01);
    //   setCreatures0Or1(main01)
    // }

    // if (mainDeck.length > 0 && mounted) {
    //   const main01 = mainDeck.filter((card) =>
    //     (card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))
    //   )
    //   console.log(main01);
    //   setCreatures0Or1(main01)
    // }

    // if (mainDeck.length > 0 && mounted) {
    //   const main01 = mainDeck.filter((card) =>
    //     (card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))
    //   )
    //   console.log(main01);
    //   setCreatures0Or1(main01)
    // }

    // const main2 = mainDeck.filter((card) =>
    //   (card.card.conv_mana_cost === 2) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))
    // )
    // console.log(main2);
    // setCreatures2(main2)

    // const main2 = mainDeck.filter((card) =>
    //   (card.card.conv_mana_cost === 2) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))
    // )
    // console.log(main2);
    // setCreatures2(main2)

    // const main2 = mainDeck.filter((card) =>
    //   (card.card.conv_mana_cost === 2) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))
    // )
    // console.log(main2);
    // setCreatures2(main2)

    // const main2 = mainDeck.filter((card) =>
    //   (card.card.conv_mana_cost === 2) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))
    // )
    // console.log(main2);
    // setCreatures2(main2)

    // const main2 = mainDeck.filter((card) =>
    //   (card.card.conv_mana_cost === 2) && (card.card.type.indexOf("Creature") > -1 || card.card.type.indexOf("Planeswalker" > -1))
    // )
    // console.log(main2);
    // setCreatures2(main2)
    setIsLoaded(true);
    return () => mounted = false;
  },[mainDeck])

  console.log(creatures0Or1);

  return isLoaded ? (
    <>
      <div className="deckviewer">
        <div className="deckviewer__header">
            <div className="deckviewer__VIP-user-panel-background">
              <div className="deckviewer__VIP-user-panel-background-wrapper">
                <div className="deckviewer__VIP-user-panel-background-image" style={{ backgroundImage: `url(${deck.background_img})` }}></div>
              </div>
              <div className="deckviewer__VIP-user-panel-gradient"></div>
            </div>
          <div className="deckviewer__navbar-background"></div>
          <div className="deckviewer__buffer"></div>
          <div className="deckviewer-header__main">
            <div className="deckviewer-header__deck-panel" >
              <div className="deckviewer-header__deck-panel-name" >{deck.deck_name.toUpperCase()}</div>
              <div className="deckviewer-header__deck-panel-attribution" >
                by {deck.creator_name}
              </div>
              <div className="deckviewer-header__deck-description">
                <p>{deck.description}</p>
              </div>
            </div>
          </div>
          <div className="deckviewer-header__lower-panel"></div>
        </div>
        <div className="deckviewer__statistics-container"></div>
        <div className="deckviewer__body">
          <div className="deckviewer__deck-container">
            <div className="deckviewer__main-container">
              <div className="deckviewer__creature-container01">
                {creatures0Or1.length > 0 && creatures0Or1.map((card, i) => (
                <DeckCardObject key={i} data={card}/>
              ))}</div>
              </div>
              <div className="deckviewer__creature-container2"></div>
              <div className="deckviewer__creature-container3"></div>
              <div className="deckviewer__creature-container4"></div>
              <div className="deckviewer__creature-container5"></div>
              <div className="deckviewer__creature-container6plus"></div>
              <div className="deckviewer__land-container"></div>
              <div className="deckviewer__spell-container01"></div>
              <div className="deckviewer__spell-container2"></div>
              <div className="deckviewer__spell-container3"></div>
              <div className="deckviewer__spell-container4"></div>
              <div className="deckviewer__spell-container5"></div>
              <div className="deckviewer__spell-container6plus"></div>
            <div className="deckviewer__side-container"></div>
          </div>
          <div className="deckviewer__comments-container">
            <div className="deckviewer__comments-wrapper">
              <CommentBox setPostFlag={setPostFlag} authenticated={props.authenticated} user_id={id} username={username} creator={deck.creator_name} deckName={deck.deck_name} deck_id={deck.id}/>
              <ul className="deckviewer__comments-list">
                {comments.map((comment, i) => (
                  <Comment key={i} authenticated={props.authenticated} user={props.user} comment={comment}/>
                ))}
              </ul>
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
