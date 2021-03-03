import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useLocation } from "react-router-dom";
import DeckCardObject from "./DeckCardObject.js";
import BuildSearchCardObject from "../cards/BuildSearchCardObject.js";
import cardBack from '../../assets/images/cards/cardback.jpg';
import backgroundIMG from '../../assets/backgrounds/urzas-tome.jpg';
import { CgStack } from 'react-icons/cg';
import { RiBarChartFill } from 'react-icons/ri';
import { BiListUl } from 'react-icons/bi';
import { AiFillSave } from 'react-icons/ai';
import { ImSearch } from 'react-icons/im';
import { RiInboxArchiveFill } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';
import DeckDnd from './DeckDnd';
import { useDrop } from 'react-dnd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

const DeckBuilder = (props) => {
  const initialState = [];
  const deckListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_CARD_TO_DECKLIST':
        return { ...state, deckList: state.deckList.concat(action.newCard) };
      case 'REMOVE_CARD_FROM_DECKLIST':
        return {...state, deckList: state.deckList.filter(el => el.card.id !== action.payload)};
      case 'UPDATE_CARD_COUNT_IN_MAINDECK':
        return { ...state, deckList: state.deckList.map((el) => el.card.id === action.payload.card_id ? { ...el, in_deck: action.payload.count } : el) };
      case 'UPDATE_CARD_COUNT_IN_SIDEBOARD':
        return { ...state, deckList: state.deckList.map((el) => el.card.id === action.payload.card_id ? {...el, in_sideboard: action.payload.count } : el)};
      case 'UPDATE_COMMANDER_STATUS':
        return { ...state, deckList: state.deckList.map((el) => el.card.id === action.payload.card_id? {...el, isCommander: action.payload.isCommander} : el)};
      case 'UPDATE_COMPANION_STATUS':
        return { ...state, deckList: state.deckList.map((el) => el.card.id === action.payload.card_id ? { ...el, isCompanion: action.payload.isCompanion } : el) };
      case 'RESET_DECKLIST':
        return init(action.payload);
      default:
        return state;
    }
  }
  const init = (initialState) => {
    return { deckList: initialState }
  }
  const [deckBuilderData, dispatch] = useReducer(deckListReducer, initialState, init);

  const [user, setUser] = useState({}); //needed for current user's avatar
  const [avatar, setAvatar] = useState("");
  const [comments, setComments] = useState([]);
  const [containerFlag, setContainerFlag] = useState(true);
  const [curveFlag, setCurveFlag] = useState(false);
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
  const [searchInput, setSearchInput] = useState("");
  const [foundCards, setFoundCards] = useState([]);
  const [dropData, setDropData] = useState("");
  const hoverRef = useRef();
  const searchRef = useRef();

  const { id, username } = props.user;

  // console.log(deck); // to take a peek at deck object

  useEffect(() => {
    if (!id) {
      setIsLoaded(false);
      return;
    }
  }, [user])

  // useEffect(() => {
  //   let mounted = true;
  //   if(deck.id && mounted) {
  //     (async () => {
  //       const res = await fetch(`/api/decks/${deck.id}`);
  //       const deckList = await res.json()
  //       if (deckList) {
  //         setDeck(deckList)
  //       }
  //     })()
  //     setDeckChange(false)
  //   }
  // }, [deckChange])


  useEffect(() => {
    let mounted = true;
    let main = []
    let side = []
    console.log(deckBuilderData);
    if (deckBuilderData.deckList && mounted) {
      deckBuilderData.deckList.forEach((card) => {
        if (card.in_deck > 0) {
          main.push(card)
        }
        if (card.in_sideboard > 0) {
          side.push(card)
        }
      })
    }
    console.log(main)
    //console.log(side)
    setMainDeck(main);
    setSideboard(side);
    return () => mounted = false;
  }, [deckBuilderData])

  useEffect(() => {
    let mounted = true;
    console.log(mainDeck);
    // if (mainDeck.length > 0 && mounted) {
    //   const mainCreature01 = mainDeck.filter((card) =>
    //     (parseInt(card.card.conv_mana_cost) === 0 || parseInt(card.card.conv_mana_cost) === 1) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
    //   )

    if (mounted) {
      const mainCreature01 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 0 || parseInt(card.card.conv_mana_cost) === 1) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
      )

      const mainCreature2 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 2) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
      )

      const mainCreature3 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 3) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
      )

      const mainCreature4 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 4) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
      )

      const mainCreature5 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 5) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
      )

      const mainCreature6Plus = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) >= 6) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
      )

      const lands = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 0) && (card.card.type.includes("Land"))
      )

      const mainSpell01 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 0 || parseInt(card.card.conv_mana_cost) === 1) && (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")
      )

      const mainSpell2 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 2) && (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")
      )

      const mainSpell3 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 3) && (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")
      )

      const mainSpell4 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 4) && (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")
      )

      const mainSpell5 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 5) && (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")
      )

      const mainSpell6Plus = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) >= 6) && (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")
      )

      // if (mainCreature01.length > 0) {
      //   setCreatures0Or1(mainCreature01)
      // }

      // if (mainCreature2.length > 0) {
      //   setCreatures2(mainCreature2)
      // }

      // if (mainCreature3.length > 0) {
      //   setCreatures3(mainCreature3)
      // }

      // if (mainCreature4.length > 0) {
      //   setCreatures4(mainCreature4)
      // }

      // if (mainCreature5.length > 0) {
      //   setCreatures5(mainCreature5)
      // }

      // if (mainCreature6Plus.length > 0) {
      //   setCreatures6Plus(mainCreature6Plus)
      // }

      // if (lands.length > 0) {
      //   setLands(lands)
      // }

      // if (mainSpell01.length > 0) {
      //   setSpells0Or1(mainSpell01)
      // }

      // if (mainSpell2.length > 0) {
      //   setSpells2(mainSpell2)
      // }

      // if (mainSpell3.length > 0) {
      //   setSpells3(mainSpell3)
      // }

      // if (mainSpell4.length > 0) {
      //   setSpells4(mainSpell4)
      // }

      // if (mainSpell5.length > 0) {
      //   setSpells5(mainSpell5)
      // }

      // if (mainSpell6Plus.length > 0) {
      //   setSpells6Plus(mainSpell6Plus)
      // }
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
    if (mounted) {
      const side01 = sideboard.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 0 || parseInt(card.card.conv_mana_cost) === 1) && (!card.card.type.includes("Land"))
      )

      const side2 = sideboard.filter((card) =>
        parseInt(card.card.conv_mana_cost) === 2
      )

      const side3 = sideboard.filter((card) =>
        parseInt(card.card.conv_mana_cost) === 3
      )

      const side4 = sideboard.filter((card) =>
        parseInt(card.card.conv_mana_cost) === 4
      )

      const side5 = sideboard.filter((card) =>
        parseInt(card.card.conv_mana_cost) === 5
      )

      const side6Plus = sideboard.filter((card) =>
        parseInt(card.card.conv_mana_cost) >= 6
      )

      const sideLands = sideboard.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 0) && (card.card.type.includes("Land"))
      )

      // if (side01.length > 0) {
      //   setSideSlot01(side01)
      // }

      // if (side2.length > 0) {
      //   setSideSlot2(side2)
      // }

      // if (side3.length > 0) {
      //   setSideSlot3(side3)
      // }

      // if (side4.length > 0) {
      //   setSideSlot4(side4)
      // }

      // if (side5.length > 0) {
      //   setSideSlot5(side5)
      // }

      // if (side6Plus.length > 0) {
      //   setSideSlot6Plus(side6Plus)
      // }

      // if (sideLands.length > 0) {
      //   setSideSlotLands(sideLands)
      // }

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
    let mounted = true;
    const search_text = searchInput.toLowerCase();
    searchRef.current.value = "";
    // console.log(searchInput);
    // console.log(search_text);
    if(mounted) {
      (async() => {
        const res = await fetch(`/api/search/build`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            search_text
          }),
        })

        if(!res.ok) {
          throw res;
        }

        const data = await res.json();

        if(data) {
          console.log(data);
          setFoundCards(data.cards);
        }
      })()
    }
    return () => mounted = false;
  };

  const hoverAction = (e) => {
    // console.log(e.target);
    setImagePreview(e.target.src)
  };

  const cancelHoverAction = () => {
    setImagePreview(cardBack);
  }

  const showCardContainer = () => {
    let mounted = true;
    if (mounted) {
      setlistFlag(false);
      setStacksFlag(false);
      setCurveFlag(false);
      setContainerFlag(true);
    }
    return () => mounted = false;
  }

  const showCurve = () => {
    let mounted = true;
    if (mounted) {
      setContainerFlag(false);
      setlistFlag(false);
      setStacksFlag(false);
      setCurveFlag(true);
    }
    return () => mounted = false;
  }

  const showList = () => {
    let mounted = true;
    if (mounted) {
      setContainerFlag(false);
      setStacksFlag(false);
      setCurveFlag(false);
      setlistFlag(true);
    }
    return () => mounted = false;
  }

  const showStack = () => {
    let mounted = true;
    if (mounted) {
      setContainerFlag(false);
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

  // const [{ isOver }, dropRef] = useDrop({
  //   accept: "card",
  //   drop: () => moveCard(),
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   })
  // })
  const dragStart = (e) => {
    // console.log(e.target.id);
    // console.log(e.target.name);
    // const cmc = e.target.value;
    // console.log(cmc);
    const data = { src: e.target.src, card_id: e.target.id, name: e.target.name, cmc: e.target.getAttribute('cmc'), keywords: e.target.getAttribute('keywords'), type: e.target.getAttribute('type')};
    setDropData(data);
    // console.log(JSON.stringify(data));
    // e.dataTransfer.setData("text/plain", JSON.stringify(data));
    // e.dataTransfer.setData("text",)
    // console.log(dropData)
  }

  const cardDrop = (e) => {
    // const data = e.dataTransfer.getData("text/plain");
    // console.log(data);
    // setDropData(data.JSON());
  }

  return isLoaded ? (
    <>
      <div className="deckbuilder">
        <div className="deckbuilder__header">
          <div className="deckbuilder__user-panel-background">
            <div className="deckbuilder__user-panel-background-wrapper">
              <div className="deckbuilder__user-panel-background-image" style={{ backgroundImage: `url(${backgroundIMG})` }}></div>
            </div>
            <div className="deckbuilder__user-panel-gradient"></div>
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
              <form onSubmit={handleSearch} className="deckbuilder__search-options-form">
                <div className="deckbuilder__search-options-form-top">
                  <div className="deckbuilder__search-options-form-text-field">
                    <input type="search" results="5" ref={searchRef} onChange={(e) => setSearchInput(e.target.value)} placeholder="Find Cards"></input>
                    <button></button>
                  </div>
                  <button className="deckbuilder__search-options-form-submit-button">
                    <ImSearch />
                  </button>
                </div>
                <div className="deckbuilder__search-options-form-filter-buttons-container"></div>
              </form>
            </div>
            <div className="deckbuilder__search-results-wrapper">
              <div className="deckbuilder__search-results-filters"></div>
              <div className="deckbuilder__search-results-container">
                {foundCards.length > 0 && foundCards.map((card, i) => (
                  <BuildSearchCardObject key={i} data={card} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} dragStart={dragStart} cardDrop={cardDrop}/>
                ))}
              </div>
            </div>
          </div>
          <div className="deckbuilder__deck-container">
            <div className="deckbuilder__display-buttons-wrapper">
              <button className="deckbuilder__container-button" title="Deck Builder" onClick={showCardContainer} >
                <RiInboxArchiveFill />
              </button>
              <button className="deckbuilder__curve-button" title="Curve Display" onClick={showCurve} >
                <RiBarChartFill />
              </button>
              {/* <button className="deckbuilder__list-button" title="List Display" onClick={showList} >
                <BiListUl />
              </button>
              <button className="deckbuilder__stack-button" title="Stack Display" onClick={showStack} >
                <CgStack />
              </button> */}
              <button className="deckbuilder__save-button" title="Save" onClick={saveDeck} >
                <AiFillSave />
              </button>
              <button className="deckbuilder__delete-build-button" title="Reset Deck" onClick={() => dispatch({type: 'RESET_DECKLIST', payload: initialState})}>
                <FaTrashAlt />
              </button>
            </div>
            {containerFlag && (
              <div className="deckbuilder__container-view">
                <div className="deckbuilder__container-view-wrapper">
                  {/* <div className="deckbuilder__container-view-header"></div> */}
                  <p>Drag cards here to add them to your deck</p>
                  <DeckDnd deckBuilderData={deckBuilderData} dispatch={dispatch}mainDeck={mainDeck} setMainDeck={setMainDeck} dropData={dropData} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction}/>
                </div>
                {/* <div className="deckbuilder__container-view-sideboard-wrapper">
                  <div className="deckbuilder__container-view-sideboard-header">Sideboard</div>
                  <p>Drag cards here to add them to your sideboard</p>
                  <SideboardDnd />
                </div> */}
              </div>
            )}
            {curveFlag && (
              <div className="deckbuilder__curve-view">
                <div className="deckbuilder__main-container1-title">
                  <div className="deckbuilder__main-container1-title-text">Creatures & Planeswalkers</div>
                </div>
                <div className="deckbuilder__main-container1">
                  <div className="deckbuilder__creature-container01">
                    {creatures0Or1.length > 0 && creatures0Or1.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                  <div className="deckbuilder__creature-container2">{creatures2.length > 0 && creatures2.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__creature-container3">{creatures3.length > 0 && creatures3.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__creature-container4">{creatures4.length > 0 && creatures4.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__creature-container5">{creatures5.length > 0 && creatures5.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__creature-container6plus">{creatures6Plus.length > 0 && creatures6Plus.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                </div>
                <div className="deckbuilder__companion-commander-container-title">
                  <div className="deckbuilder__companion-commander-container-title-text">Companion/ Commander</div>
                </div>
                <div className="deckbuilder__other-container">
                  <div className="deckbuilder__companion-commander-container"></div>
                  <div className="deckbuilder__land-container-title">
                    <div className="deckbuilder__land-container-title-text">Lands</div>
                  </div>
                  <div className="deckbuilder__land-container">{lands.length > 0 && lands.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                </div>
                <div className="deckbuilder__main-container2-title">
                  <div className="deckbuilder__main-container2-title-text">Spells & Artifacts</div>
                </div>
                <div className="deckbuilder__main-container2">
                  <div className="deckbuilder__spell-container01">
                    {spells0Or1.length > 0 && spells0Or1.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                  <div className="deckbuilder__spell-container2">{spells2.length > 0 && spells2.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__spell-container3">{spells3.length > 0 && spells3.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__spell-container4">{spells4.length > 0 && spells4.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__spell-container5">{spells5.length > 0 && spells5.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__spell-container6plus">{spells6Plus.length > 0 && spells6Plus.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                </div>
                <div className="deckbuilder__side-container-title">
                  <div className="deckbuilder__side-container-title-text">Sideboard</div>
                </div>
                <div className="deckbuilder__side-container">
                  <div className="deckbuilder__sideslot01-container01">
                    {sideSlot01.length > 0 && sideSlot01.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                  <div className="deckbuilder__sideslot2-container2">{sideSlot2.length > 0 && sideSlot2.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__sideslot3-container3">{sideSlot3.length > 0 && sideSlot3.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__sideslot4-container4">{sideSlot4.length > 0 && sideSlot4.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__sideslot5-container5">{sideSlot5.length > 0 && sideSlot5.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__sideslot6plus-container6plus">{sideSlot6Plus.length > 0 && sideSlot6Plus.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                </div>
                <div className="deckbuilder__sideslotlands-container">{sideSlotLands.length > 0 && sideSlotLands.map((card, i) => (
                  <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                ))}</div>
              </div>
            )}
            {listFlag && (
              <div className="deckbuilder__list-view">This is the list view</div>
            )}
            {stacksFlag && (
              <div className="deckbuilder__stack-view">This is the stack view</div>
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
