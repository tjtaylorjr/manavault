import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import DeckCardObject from "./DeckCardObject.js";
import DeckObject from "./DeckObject.js";
import cardBack from '../../assets/images/cards/cardback.jpg';
import backgroundIMG from '../../assets/backgrounds/urzas-tome.jpg';
import { CgStack } from 'react-icons/cg';
import { RiBarChartFill } from 'react-icons/ri';
import { BiListUl, BiSave } from 'react-icons/bi';

const DeckBuilder = (props) => {
  const [user, setUser] = useState({}); //needed for current user's avatar
  const [avatar, setAvatar] = useState("");
  const [comments, setComments] = useState([]);
  const [curveFlag, setCurveFlag] = useState(true);
  const [listFlag, setlistFlag] = useState(false);
  const [stacksFlag, setStacksFlag] = useState(false);
  const [saveFlag, setSaveFlag] = useState(false);
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
  const [sideSlot01, setSideSlot01] = useState([]);
  const [sideSlot2, setSideSlot2] = useState([]);
  const [sideSlot3, setSideSlot3] = useState([]);
  const [sideSlot4, setSideSlot4] = useState([]);
  const [sideSlot5, setSideSlot5] = useState([]);
  const [sideSlot6Plus, setSideSlot6Plus] = useState([]);
  const [sideSlotLands, setSideSlotLands] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();
  const [deck, setDeck] = useState({});
  const [deckChange, setDeckChange] = useState(false);
  const [imagePreview, setImagePreview] = useState(cardBack);
  const [searchText, setSearchText] = useState("");

  // const drawerRef = useRef();
  const hoverRef = useRef();
  const searchInput = useRef();

  const { id, username } = props.user;

  // console.log(deck); // to take a peek at deck object

  useEffect(() => {
    if (!id) {
      setIsLoaded(false);
      return;
    }

  //   setIsLoaded(false);
  //   (async () => {
  //     const response = await fetch(`/api/users/${id}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })();
  // }, [id]);

  // useEffect(() => {
  //   if (Object.keys(user).length === 12) {
  //     const avatar_img = user.info.avatar;
  //     setAvatar(avatar_img);
  //   }
  }, [user])

  useEffect(() => {
    let mounted = true;
    if(deck.id && mounted) {
      (async () => {
        const res = await fetch(`/api/decks/${deck.id}`);
        const deckList = await res.json()
        if (deckList) {
          setDeck(deckList)
        }
      })()
      setDeckChange(false)
    }
  }, [deckChange])


  useEffect(() => {
    let mounted = true;
    let main = []
    let side = []
    if (deck.card_list && mounted) {
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
  }, [deck.card_list])

  useEffect(() => {
    let mounted = true;
    if (mainDeck.length > 0 && mounted) {
      const mainCreature01 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
      )

      const mainCreature2 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 2) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
      )

      const mainCreature3 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 3) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
      )

      const mainCreature4 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 4) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
      )

      const mainCreature5 = mainDeck.filter((card) =>
        (card.card.conv_mana_cost === 5) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
      )

      const mainCreature6Plus = mainDeck.filter((card) =>
        (card.card.conv_mana_cost >= 6) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
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

      if (mainCreature01.length > 0) {
        setCreatures0Or1(mainCreature01)
      }

      if (mainCreature2.length > 0) {
        setCreatures2(mainCreature2)
      }

      if (mainCreature3.length > 0) {
        setCreatures3(mainCreature3)
      }

      if (mainCreature4.length > 0) {
        setCreatures4(mainCreature4)
      }

      if (mainCreature5.length > 0) {
        setCreatures5(mainCreature5)
      }

      if (mainCreature6Plus.length > 0) {
        setCreatures6Plus(mainCreature6Plus)
      }

      if (lands.length > 0) {
        setLands(lands)
      }

      if (mainSpell01.length > 0) {
        setSpells0Or1(mainSpell01)
      }

      if (mainSpell2.length > 0) {
        setSpells2(mainSpell2)
      }

      if (mainSpell3.length > 0) {
        setSpells3(mainSpell3)
      }

      if (mainSpell4.length > 0) {
        setSpells4(mainSpell4)
      }

      if (mainSpell5.length > 0) {
        setSpells5(mainSpell5)
      }

      if (mainSpell6Plus.length > 0) {
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
        (card.card.conv_mana_cost === 0 || card.card.conv_mana_cost === 1) && (!card.card.type.includes("Land"))
      )

      const side2 = sideboard.filter((card) =>
        card.card.conv_mana_cost === 2
      )

      const side3 = sideboard.filter((card) =>
        card.card.conv_mana_cost === 3
      )

      const side4 = sideboard.filter((card) =>
        card.card.conv_mana_cost === 4
      )

      const side5 = sideboard.filter((card) =>
        card.card.conv_mana_cost === 5
      )

      const side6Plus = sideboard.filter((card) =>
        card.card.conv_mana_cost >= 6
      )

      const sideLands = sideboard.filter((card) =>
        (card.card.conv_mana_cost === 0) && (card.card.type.includes("Land"))
      )

      if (side01.length > 0) {
        setSideSlot01(side01)
      }

      if (side2.length > 0) {
        setSideSlot2(side2)
      }

      if (side3.length > 0) {
        setSideSlot3(side3)
      }

      if (side4.length > 0) {
        setSideSlot4(side4)
      }

      if (side5.length > 0) {
        setSideSlot5(side5)
      }

      if (side6Plus.length > 0) {
        setSideSlot6Plus(side6Plus)
      }

      if (sideLands.length > 0) {
        setSideSlotLands(sideLands)
      }

    }
    setIsLoaded(true);
    return () => mounted = false;
  }, [sideboard])

  // const toggleDrawer = () => {
  //   if (drawerRef.current.classList.contains("deckbuilder__comments-drawer--hide")) {
  //     drawerRef.current.classList.remove("deckbuilder__comments-drawer--hide");
  //     drawerRef.current.classList.add("deckbuilder__comments-drawer--reveal");
  //   } else if (drawerRef.current.classList.contains("deckbuilder__comments-drawer--reveal")) {
  //     drawerRef.current.classList.remove("deckbuilder__comments-drawer--reveal");
  //     drawerRef.current.classList.add("deckbuilder__comments-drawer--hide");
  //   }
  // };

  useEffect(() => {
    let mounted = true;
    if (saveFlag && mounted) {

    }
    setSaveFlag(false);
    return () => mounted = false;
  }, [saveFlag])

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchText.toLowerCase();
    searchInput.current.value = "";

  };

  const hoverAction = (e) => {
    setImagePreview(e.target.src)
  };

  const unHoverAction = () => {
    setImagePreview(cardBack);
  }

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

  const saveDeck = () => {
    let mounted = true;
    if (mounted) {
      setSaveFlag(true);
    }
    return () => mounted = false;
  }

  return isLoaded ? (
    <>
      <div className="deckbuilder">
        <div className="deckbuilder__header">
          <div className="deckbuilder__user-panel-background">
            <div className="deckbuilder__VIP-user-panel-background-wrapper">
              <div className="deckbuilder__VIP-user-panel-background-image" style={{ backgroundImage: `url(${backgroundIMG})` }}></div>
            </div>
            <div className="deckbuilder__VIP-user-panel-gradient"></div>
          </div>
          {/* <div className="deckbuilder__navbar-background"></div> */}
          {/* <div className="deckbuilder__buffer"></div> */}
          <div className="deckbuilder-header__main">
            {/* <div className="deckbuilder-header__deck-panel" > */}
              {/* <div className="deckbuilder-header__deck-panel-name" >{deck.deck_name.toUpperCase()}</div> */}
              {/* <div className="deckbuilder-header__deck-panel-attribution" >
                by {deck.creator_name}
              </div> */}
              {/* <div className="deckbuilder-header__deck-description">
                <p>{deck.description}</p>
              </div> */}
            {/* </div> */}
          </div>
          {/* <div className="deckbuilder-header__lower-panel"></div> */}
        </div>
        <div className="deckbuilder__body">
          <div className="deckbuilder__search-panel">
            <div className="deckbuilder__search-options-container">
              <form className="deckbuilder__search-options-form">
                <div className="deckbuilder__search-options-form-text-field">
                  <input type="search" results="5" ref={searchInput} onChange={(e) => setSearchText(e.target.value)} placeholder="Find Cards"></input>
                  <button onClick={handleSearch}></button>
                </div>
              </form>
            </div>
            <div className="deckbuilder__search-results-container"></div>
          </div>
          <div className="deckbuilder__deck-container">
            <div className="deckbuilder__display-buttons-wrapper">
              <button className="deckbuilder__curve-button" onClick={showCurve} >
                <RiBarChartFill />
              </button>
              <button className="deckbuilder__list-button" onClick={showList} >
                <BiListUl />
              </button>
              <button className="deckbuilder__stack-button" onClick={showStack} >
                <CgStack />
              </button>
              <button className="deckbuilder__save-button" onClick={saveDeck} >
                <BiSave />
              </button>
            </div>
            {curveFlag && (
              <div className="deckbuilder__curve-view">
                <div className="deckbuilder__main-container1-title">
                  <div className="deckbuilder__main-container1-title-text">Creatures & Planeswalkers</div>
                </div>
                <div className="deckbuilder__main-container1">
                  <div className="deckbuilder__creature-container01">
                    {creatures0Or1.length > 0 && creatures0Or1.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                    ))}</div>
                  <div className="deckbuilder__creature-container2">{creatures2.length > 0 && creatures2.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__creature-container3">{creatures3.length > 0 && creatures3.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__creature-container4">{creatures4.length > 0 && creatures4.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__creature-container5">{creatures5.length > 0 && creatures5.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__creature-container6plus">{creatures6Plus.length > 0 && creatures6Plus.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                </div>
                <div className="deckbuilder__land-container-title">
                  <div className="deckbuilder__land-container-title-text">Lands</div>
                </div>
                <div className="deckbuilder__land-container">{lands.length > 0 && lands.map((card, i) => (
                  <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                ))}</div>
                <div className="deckbuilder__main-container2-title">
                  <div className="deckbuilder__main-container2-title-text">Spells & Artifacts</div>
                </div>
                <div className="deckbuilder__main-container2">
                  <div className="deckbuilder__spell-container01">
                    {spells0Or1.length > 0 && spells0Or1.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                    ))}</div>
                  <div className="deckbuilder__spell-container2">{spells2.length > 0 && spells2.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__spell-container3">{spells3.length > 0 && spells3.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__spell-container4">{spells4.length > 0 && spells4.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__spell-container5">{spells5.length > 0 && spells5.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__spell-container6plus">{spells6Plus.length > 0 && spells6Plus.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                </div>
                <div className="deckbuilder__side-container-title">
                  <div className="deckbuilder__side-container-title-text">Sideboard</div>
                </div>
                <div className="deckbuilder__side-container">
                  <div className="deckbuilder__sideslot01-container01">
                    {sideSlot01.length > 0 && sideSlot01.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                    ))}</div>
                  <div className="deckbuilder__sideslot2-container2">{sideSlot2.length > 0 && sideSlot2.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__sideslot3-container3">{sideSlot3.length > 0 && sideSlot3.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__sideslot4-container4">{sideSlot4.length > 0 && sideSlot4.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__sideslot5-container5">{sideSlot5.length > 0 && sideSlot5.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__sideslot6plus-container6plus">{sideSlot6Plus.length > 0 && sideSlot6Plus.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                  ))}</div>
                </div>
                <div className="deckbuilder__sideslotlands-container">{sideSlotLands.length > 0 && sideSlotLands.map((card, i) => (
                  <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={unHoverAction} />
                ))}</div>
              </div>
            )}
            {listFlag && (
              <div className="deckbuilder__list-view">This is the list view</div>
            )}
          </div>
          <div className="deckbuilder__card-display">
            <div className="deckbuilder__card-display-image" style={{ backgroundImage: `url(${imagePreview})` }}></div>
          </div>
        </div>
      </div>
    </>
  ) : (
      <>
        <div className="deckbuilder"></div>
      </>
    )
}

export default DeckBuilder;
