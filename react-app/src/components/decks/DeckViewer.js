import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import CommentBox from "../social/CommentBox.js";
import Comment from "../social/Comment.js";
import DeckCardObject from "./DeckCardObject.js";
import { AiFillLike, } from 'react-icons/ai';
import { IoBuild, IoHammer } from 'react-icons/io5';
import { RiBarChartFill } from 'react-icons/ri';
import { GiQuillInk } from 'react-icons/gi';
import { FaTrashAlt } from 'react-icons/fa';


import cardBack from '../../assets/images/cards/cardback.jpg';

const DeckViewer = (props) => {
  const [user, setUser] = useState({}); //needed for current user's avatar
  const [avatar, setAvatar] = useState("");
  const [comments, setComments] = useState([]);
  const [postFlag, setPostFlag] = useState(false);
  const [likeChangeFlag, setLikeChangeFlag] = useState(false);
  // const [isVIP, setIsVIP] = useState(false);
  const [mainDeck, setMainDeck] = useState([]);
  const [creatures0Or1, setCreatures0Or1] = useState([]);
  const [creatures2, setCreatures2] = useState([]);
  const [creatures3, setCreatures3] = useState([]);
  const [creatures4, setCreatures4] = useState([]);
  const [creatures5, setCreatures5] = useState([]);
  const [creatures6Plus, setCreatures6Plus] = useState([]);
  const [commanders, setCommanders] = useState([]);
  const [lands, setLands] = useState([]);
  const [spells0Or1, setSpells0Or1] = useState([]);
  const [spells2, setSpells2] = useState([]);
  const [spells3, setSpells3] = useState([]);
  const [spells4, setSpells4] = useState([]);
  const [spells5, setSpells5] = useState([]);
  const [spells6Plus, setSpells6Plus] = useState([]);
  const [sideboard, setSideboard] = useState([]);
  const [sideSlot01, setSideSlot01] = useState([]);
  const [sideSlot2, setSideSlot2] = useState([]);
  const [sideSlot3, setSideSlot3] = useState([]);
  const [sideSlot4, setSideSlot4] = useState([]);
  const [sideSlot5, setSideSlot5] = useState([]);
  const [sideSlot6Plus, setSideSlot6Plus] = useState([]);
  const [sideSlotLands, setSideSlotLands] = useState([]);
  const [sideSlotCompanion, setSideSlotCompanion] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const [deck, setDeck] = useState(location.state.data);
  const userLikeStatus = deck.deck_likes.filter((like) => like.username === props.user.username);
  const [likeToggle, setLikeToggle] = useState(userLikeStatus.length > 0 ? true : false)
  const [imagePreview, setImagePreview] = useState(cardBack);
  const [curveFlag, setCurveFlag] = useState(true);
  const [listFlag, setlistFlag] = useState(false);
  const [stacksFlag, setStacksFlag] = useState(false);

  const history = useHistory();
  const drawerRef = useRef();
  const hoverRef = useRef();

  const { id, username } = props.user;


  console.log(deck); // to take a peek at deck object

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
      setAvatar(avatar_img);
    }
  }, [user])

  useEffect(() => {
    const deck_id = deck.id;
    (async() => {
      await fetch(`/api/decks/${deck_id}/view`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "user_id": props.user.id,
        })
      })
    })()
  },[])

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/decks/${deck.id}/comments`);
      const commentList = await res.json()
      if (commentList) {
        setComments(commentList.comments)
      }
    })()
    setPostFlag(false)
  }, [deck.id, postFlag])
console.log(props.user);

  useEffect(() => {
    if(likeChangeFlag) {
      if(userLikeStatus.length > 0) {
        let userIdx = -1;
        for(let i = 0; i < deck.deck_likes.length; i++) {
          if(deck.deck_likes[i].username === props.user.username) {
            userIdx = i;
          }
        }
        deck.deck_likes.splice(userIdx, 1);
        setLikeToggle(false);
      } else {
        deck.deck_likes.push({
          created_at: new Date(),
          email: props.user.email,
          id: props.user.id,
          info: props.user.info,
          username: props.user.username,
        })
        setLikeToggle(true);
      }
    }
    setLikeChangeFlag(false);
  },[likeChangeFlag])

  const likeChange = async (e) => {
    const deck_id = deck.id
    if(props.user.id !== deck.user_id) {
      await fetch(`/api/decks/${deck_id}/like`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "user_id": props.user.id,
        })
      })
      setLikeChangeFlag(true);
    }
  }



  useEffect(() => {
    let mounted = true;
    let main = []
    let side = []
    if (mounted) {
      deck.card_list.forEach((card) => {
        if (card.in_deck > 0) {
          main.push(card)
        }
        if (card.in_sideboard > 0) {
          side.push(card)
        }
      })
    }

    setMainDeck(main);
    setSideboard(side);
    return () => mounted = false;
  }, [deck])

  useEffect(() => {
    let mounted = true;
    if (mainDeck.length > 0 && mounted) {
      const mainCreature01 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")) && card.is_commander === false
      )

      const mainCreature2 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 2) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")) && card.is_commander === false
      )

      const mainCreature3 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 3) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")) && card.is_commander === false
      )

      const mainCreature4 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 4) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")) && card.is_commander === false
      )

      const mainCreature5 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 5) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")) && card.is_commander === false
      )

      const mainCreature6Plus = mainDeck.filter((card) =>
        (card.card.conv_mana_cost >= 6) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")) && card.is_commander === false
      )

      const deckCommanders = mainDeck.filter((card) =>
        card.is_commander === true
      )

      const lands = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 0) && (card.card.type.includes("Land"))
      )

      const mainSpell01 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")
      )

      const mainSpell2 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 2) && (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")
      )

      const mainSpell3 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 3) && (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")
      )

      const mainSpell4 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 4) && (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")
      )

      const mainSpell5 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 5) && (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")
      )

      const mainSpell6Plus = mainDeck.filter((card) =>
        (card.card.conv_mana_cost >= 6) && (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")
      )

      if (mainCreature01) {
        setCreatures0Or1(mainCreature01)
      }

      if (mainCreature2) {
        setCreatures2(mainCreature2)
      }

      if (mainCreature3) {
        setCreatures3(mainCreature3)
      }

      if (mainCreature4) {
        setCreatures4(mainCreature4)
      }

      if (mainCreature5) {
        setCreatures5(mainCreature5)
      }

      if (mainCreature6Plus) {
        setCreatures6Plus(mainCreature6Plus)
      }

      if (deckCommanders) {
        setCommanders(deckCommanders)
      }

      if (lands) {
        setLands(lands)
      }

      if (mainSpell01) {
        setSpells0Or1(mainSpell01)
      }

      if (mainSpell2) {
        setSpells2(mainSpell2)
      }

      if (mainSpell3) {
        setSpells3(mainSpell3)
      }

      if (mainSpell4) {
        setSpells4(mainSpell4)
      }

      if (mainSpell5) {
        setSpells5(mainSpell5)
      }

      if (mainSpell6Plus) {
        setSpells6Plus(mainSpell6Plus)
      }
    }
    setIsLoaded(true);
    return () => mounted = false;
  }, [mainDeck])

  useEffect(() => {
    let mounted = true;
    if (sideboard.length > 0 && mounted) {
      const side01 = sideboard.filter((card) =>
        (card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (!card.card.type.includes("Land")) && card.is_companion === false
      )

      const side2 = sideboard.filter((card) =>
        card.card.conv_mana_cost === 2 && card.is_companion === false
      )

      const side3 = sideboard.filter((card) =>
        card.card.conv_mana_cost === 3 && card.is_companion === false
      )

      const side4 = sideboard.filter((card) =>
        card.card.conv_mana_cost === 4 && card.is_companion === false
      )

      const side5 = sideboard.filter((card) =>
        card.card.conv_mana_cost === 5 && card.is_companion === false
      )

      const side6Plus = sideboard.filter((card) =>
        card.card.conv_mana_cost >= 6 && card.is_companion === false
      )

      const sideLands = sideboard.filter((card) =>
        (card.card.conv_mana_cost === 0) && (card.card.type.includes("Land"))
      )

      const deckCompanion = sideboard.filter((card) =>
        card.is_companion === true
      )

      if (side01) {
        setSideSlot01(side01)
      }

      if (side2) {
        setSideSlot2(side2)
      }

      if (side3) {
        setSideSlot3(side3)
      }

      if (side4) {
        setSideSlot4(side4)
      }

      if (side5) {
        setSideSlot5(side5)
      }

      if (side6Plus) {
        setSideSlot6Plus(side6Plus)
      }

      if (sideLands) {
        setSideSlotLands(sideLands)
      }

      if (deckCompanion) {
        setSideSlotCompanion(deckCompanion)
      }


    }
    setIsLoaded(true);
    return () => mounted = false;
  }, [sideboard])

  const toggleDrawer = () => {
    if (drawerRef.current.classList.contains("deckviewer__comments-drawer--hide")) {
      drawerRef.current.classList.remove("deckviewer__comments-drawer--hide");
      drawerRef.current.classList.add("deckviewer__comments-drawer--reveal");
    } else if (drawerRef.current.classList.contains("deckviewer__comments-drawer--reveal")) {
      drawerRef.current.classList.remove("deckviewer__comments-drawer--reveal");
      drawerRef.current.classList.add("deckviewer__comments-drawer--hide");
    }
  };

  const showCurve = () => {
    let mounted = true;
    if (mounted) {
      setlistFlag(false);
      setStacksFlag(false);
      setCurveFlag(true);
    }
    return () => mounted = false;
  }

  const showList = () => {
    let mounted = true;
    if (mounted) {
      setStacksFlag(false);
      setCurveFlag(false);
      setlistFlag(true);
    }
    return () => mounted = false;
  }

  const showStack = () => {
    let mounted = true;
    if (mounted) {
      setlistFlag(false);
      setCurveFlag(false);
      setStacksFlag(true);
    }
    return () => mounted = false;
  }

  const deleteDeck = () => {
    if (window.confirm(`Are you sure you want to delete ${deck.deck_name}? This action is irreversible.`)) {
      (async() => {
        const res = await fetch(`/api/decks/${deck.id}/delete`, {
          method: "DELETE",
          "Content-Type": "application/json",
        })

        if(!res.ok) {
          throw res
        } else {
          alert(`${deck.deck_name} has been deleted`);
          history.push(`/users/${id}`);
        }
      })()
    }
  }

  const editDeck = () => {
    const data = deck;
    history.push({
      pathname: `/decks/${deck.id}/edit`,
      state: { data }
    })
  }

  const hoverAction = (e) => {
    setImagePreview(e.target.src)
  };

  const cancelHoverAction = () => {
    setImagePreview(cardBack);
  }

  return isLoaded ? (
    <>
      <div className="deckviewer">
        <div className="deckviewer__header">
          <div className="deckviewer__user-panel-background">
            <div className="deckviewer__user-panel-background-wrapper">
              <div className="deckviewer__user-panel-background-image" style={{ backgroundImage: `url(${deck.background_img})` }}></div>
            </div>
            <div className="deckviewer__user-panel-gradient"></div>
          </div>
          <div className="deckviewer-header__main">
            <div className="deckviewer-header__deck-panel" >
              <div className="deckviewer-header__deck-panel-name" >{deck.deck_name.toUpperCase()}</div>
              <div className="deckviewer-header__deck-panel-attribution" >
                by {deck.creator_name}
              </div>
              <div className="deckviewer-header__deck-description">
                <p>{deck.description}</p>
              </div>
              <div className="deckviewer-header__social-buttons-container">
                <button className="deckviewer-header__like-button" onClick={likeChange}><AiFillLike style={{ marginBottom: "1px", border: "#E6CD8C", fill: likeToggle ? "#FF6000" : "#06090F"}}/></button>
              </div>
            </div>
          </div>
        </div>
        <div className="deckviewer__body">
          {id === deck.user_id &&
            <div className="deckviewer__display-buttons-wrapper">
              <button className="deckviewer__container-button" title="Build" alt="build" onClick={() => history.push("/decks/build")}>
                <IoHammer />
              </button>
              {/* <button className="deckviewer__curve-button" title="Curve Display" onClick={showCurve} >
                <RiBarChartFill />
              </button> */}
              {/* <button className="deckviewer__list-button" title="List Display" onClick={showList} >
                  <BiListUl />
                </button>
                <button className="deckviewer__stack-button" title="Stack Display" onClick={showStack} >
                  <CgStack />
                </button> */}
              <button className="deckviewer__edit-button" title="Edit" onClick={editDeck} >
                <IoBuild />
              </button>
              <button className="deckviewer__delete-deck-button" title="Delete Deck" onClick={deleteDeck}>
                <FaTrashAlt style={{ height: '1.15rem' }} />
              </button>
            </div>
          }
          <div className="deckviewer__deck-container">
            {curveFlag && (
              <div className="deckviewer__curve-view">
                <div className="deckviewer__curve-view-special-cards">
                  <div
                    className="deckviewer__curve-view-special-cards-commander"
                    style={commanders.length > 0 ? { display: '' } : { display: "none" }}
                  >
                    <div className="deckviewer__commander-container-title">
                      <div className="deckviewer__commander-container-title-text">Commander</div>
                    </div>
                    <div className="deckviewer__commander-container">
                      {commanders.length > 0 && commanders.map((card, i) => (
                        <DeckCardObject
                          key={i} data={card}
                          // num={card.in_sideboard}
                          showImagePreview={hoverAction}
                          dropImagePreview={cancelHoverAction}
                        />
                      ))}
                    </div>
                  </div>
                  <div
                    className="deckviewer__curve-view-special-cards-companion"
                    style={sideSlotCompanion.length > 0 ? { display: '' } : { display: "none" }}
                  >
                    <div className="deckviewer__companion-container-title">
                      <div className="deckviewer__companion-container-title-text">Companion</div>
                    </div>
                    <div className="deckviewer__companion-container">{sideSlotCompanion.length > 0 && sideSlotCompanion.map((card, i) => (
                      <DeckCardObject
                        key={i} data={card}
                        // num={card.in_sideboard}
                        showImagePreview={hoverAction}
                        dropImagePreview={cancelHoverAction}
                      />
                    ))}</div>
                  </div>
                </div>
                <div className="deckviewer__curve-view-grid">
                  <div className="deckviewer__main-container1-title">
                    <div className="deckviewer__main-container1-title-text">{`Creatures & Planeswalkers (` + mainDeck.filter((card) =>
                      card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")).reduce((total, el) => total + el.in_deck, 0) + `)`}</div>
                    <div className="deckviewer__main-container1-row-description">
                      <p>{"(CMC 0-1)"}</p>
                      <p>{"(CMC 2)"}</p>
                      <p>{"(CMC 3)"}</p>
                      <p>{"(CMC 4)"}</p>
                      <p>{"(CMC 5)"}</p>
                      <p>{"(CMC 6+)"}</p>
                    </div>
                  </div>
                  <div className="deckviewer__main-container1">
                    <div className="deckviewer__creature-container01">
                      {creatures0Or1.length > 0 && creatures0Or1.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__creature-container2">
                      {creatures2.length > 0 && creatures2.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__creature-container3">

                      {creatures3.length > 0 && creatures3.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__creature-container4">
                      {creatures4.length > 0 && creatures4.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__creature-container5">
                      {creatures5.length > 0 && creatures5.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__creature-container6plus">
                      {creatures6Plus.length > 0 && creatures6Plus.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                  </div>
                  <div className="deckviewer__land-container-title">
                    <div className="deckviewer__land-container-title-text">{`Lands (` + mainDeck.filter((card) =>
                      card.card.type.includes("Land")).reduce((total, el) => total + el.in_deck, 0) + `)`}</div>
                  </div>
                  <div className="deckviewer__land-container">{lands.length > 0 && lands.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckviewer__main-container2-title">
                    <div className="deckviewer__main-container2-title-text">{`Spells & Artifacts (` + mainDeck.filter((card) =>
                      (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")).reduce((total, el) => total + el.in_deck, 0) + `)`}</div>
                    <div className="deckviewer__main-container2-row-description">
                      <p>{"(CMC 0-1)"}</p>
                      <p>{"(CMC 2)"}</p>
                      <p>{"(CMC 3)"}</p>
                      <p>{"(CMC 4)"}</p>
                      <p>{"(CMC 5)"}</p>
                      <p>{"(CMC 6+)"}</p>
                    </div>
                  </div>
                  <div className="deckviewer__main-container2">
                    <div className="deckviewer__spell-container01">
                      {spells0Or1.length > 0 && spells0Or1.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__spell-container2">
                      {spells2.length > 0 && spells2.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__spell-container3">
                      {spells3.length > 0 && spells3.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__spell-container4">
                      {spells4.length > 0 && spells4.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__spell-container5">
                      {spells5.length > 0 && spells5.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__spell-container6plus">
                      {spells6Plus.length > 0 && spells6Plus.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                  </div>
                  <div className="deckviewer__side-container-title">
                    <div className="deckviewer__side-container-title-text">{`Sideboard (` + sideboard.reduce((total, el) => total + el.in_sideboard, 0) + `)`}</div>
                    <div className="deckviewer__side-container-row-description">
                      <p>{"(CMC 0-1)"}</p>
                      <p>{"(CMC 2)"}</p>
                      <p>{"(CMC 3)"}</p>
                      <p>{"(CMC 4)"}</p>
                      <p>{"(CMC 5)"}</p>
                      <p>{"(CMC 6+)"}</p>
                      <p>{"(Extra Lands)"}</p>
                    </div>
                  </div>
                  <div className="deckviewer__side-container">
                    <div className="deckviewer__sideslot01-container">
                      {sideSlot01.length > 0 && sideSlot01.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__sideslot2-container">
                      {sideSlot2.length > 0 && sideSlot2.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__sideslot3-container">
                      {sideSlot3.length > 0 && sideSlot3.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__sideslot4-container">
                      {sideSlot4.length > 0 && sideSlot4.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__sideslot5-container">
                      {sideSlot5.length > 0 && sideSlot5.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__sideslot6plus-container">
                      {sideSlot6Plus.length > 0 && sideSlot6Plus.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckviewer__sideslotlands-container">
                      {sideSlotLands.length > 0 && sideSlotLands.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                  </div>
                </div>
                {/* <div className="deckviewer__main-container1-title">
                  <div className="deckviewer__main-container1-title-text">Creatures & Planeswalkers</div>
                </div>
                <div className="deckviewer__main-container1">
                  <div className="deckviewer__creature-container01">
                    {creatures0Or1.length > 0 && creatures0Or1.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                    ))}</div>
                  <div className="deckviewer__creature-container2">{creatures2.length > 0 && creatures2.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckviewer__creature-container3">{creatures3.length > 0 && creatures3.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckviewer__creature-container4">{creatures4.length > 0 && creatures4.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckviewer__creature-container5">{creatures5.length > 0 && creatures5.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckviewer__creature-container6plus">{creatures6Plus.length > 0 && creatures6Plus.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                </div>
                <div className="deckviewer__land-container-title">
                  <div className="deckviewer__land-container-title-text">Lands</div>
                </div>
                <div className="deckviewer__land-container">{lands.length > 0 && lands.map((card, i) => (
                  <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                ))}</div>
                <div className="deckviewer__main-container2-title">
                  <div className="deckviewer__main-container2-title-text">Spells & Artifacts</div>
                </div>
                <div className="deckviewer__main-container2">
                  <div className="deckviewer__spell-container01">
                    {spells0Or1.length > 0 && spells0Or1.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                    ))}</div>
                  <div className="deckviewer__spell-container2">{spells2.length > 0 && spells2.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckviewer__spell-container3">{spells3.length > 0 && spells3.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckviewer__spell-container4">{spells4.length > 0 && spells4.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckviewer__spell-container5">{spells5.length > 0 && spells5.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckviewer__spell-container6plus">{spells6Plus.length > 0 && spells6Plus.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                </div>
                <div className="deckviewer__side-container-title">
                  <div className="deckviewer__side-container-title-text">Sideboard</div>
                </div>
                <div className="deckviewer__side-container">
                  <div className="deckviewer__sideslot01-container01">
                    {sideSlot01.length > 0 && sideSlot01.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                    ))}</div>
                  <div className="deckviewer__sideslot2-container2">{sideSlot2.length > 0 && sideSlot2.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckviewer__sideslot3-container3">{sideSlot3.length > 0 && sideSlot3.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckviewer__sideslot4-container4">{sideSlot4.length > 0 && sideSlot4.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckviewer__sideslot5-container5">{sideSlot5.length > 0 && sideSlot5.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckviewer__sideslot6plus-container6plus">{sideSlot6Plus.length > 0 && sideSlot6Plus.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                </div>
                <div className="deckviewer__sideslotlands-container">{sideSlotLands.length > 0 && sideSlotLands.map((card, i) => (
                  <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                ))}</div> */}
              </div>
            )}
          </div>
          <div className="deckviewer__card-display">
            <div className="deckviewer__card-display-image" style={{ backgroundImage: `url(${imagePreview})` }}></div>
          </div>
          <div className="deckviewer__multipurpose-box">
            <div className="deckviewer__comments-drawer deckviewer__comments-drawer--hide" ref={drawerRef}>
              <div className="deckviewer__comments-pulltab" onClick={toggleDrawer}>
                <GiQuillInk className="deckviewer__pulltab-svg"></GiQuillInk>
              </div>
              <div className="deckviewer__comments-container">
                <div className="deckviewer__comments-wrapper">
                  <ul className="deckviewer__comments-list">
                    {comments.map((comment, i) => (
                      <Comment key={i} authenticated={props.authenticated} user={props.user} comment={comment} />
                    ))}
                  </ul>
                  <CommentBox setPostFlag={setPostFlag} authenticated={props.authenticated} user_id={id} username={username} creator={deck.creator_name} deckName={deck.deck_name} deck_id={deck.id} />
                </div>
              </div>
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
