import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import DeckCardObject from "./DeckCardObject.js";
import BuildSearchCardObject from "../cards/BuildSearchCardObject.js";
import cardBack from '../../assets/images/cards/cardback.jpg';
import backgroundIMG from '../../assets/backgrounds/urzas-tome.jpg';
import { CgStack } from 'react-icons/cg';
import { RiBarChartFill } from 'react-icons/ri';
import { GiCardExchange, GiCardPick } from 'react-icons/gi';
import { BiListUl } from 'react-icons/bi';
import { AiFillSave } from 'react-icons/ai';
import { ImSearch } from 'react-icons/im';
import { RiInboxArchiveFill } from 'react-icons/ri';
import { BiReset } from 'react-icons/bi';
import DeckDnd from './DeckDnd';
import Select from 'react-select';
import { useDrop } from 'react-dnd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import snowManaSymbolUnselected from '../../assets/images/symbols/snow_mana_unselected_build_page.svg';
import snowManaSymbolSelected from '../../assets/images/symbols/snow_mana_selected_build_page.svg';
import xCostSelected from '../../assets/images/symbols/x_cost_selected.svg';
import xCostUnselected from '../../assets/images/symbols/x_cost_unselected.svg';


const DeckBuilder = (props) => {
  const initialState = [];
  const deckListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_CARD_TO_DECKLIST':
        return { ...state, deckList: state.deckList.concat(action.newCard) };
      case 'REPLACE_DECKLIST':
        return {...state, deckList: action.payload.cardsList }
      case 'REMOVE_CARD_FROM_DECKLIST':
        return {...state, deckList: state.deckList.filter(el => el.card.id !== action.payload)};
      case 'UPDATE_CARD_COUNT_IN_MAINDECK':
        return { ...state, deckList: state.deckList.map((el) => el.card.id === action.payload.card_id ? { ...el, in_deck: action.payload.count } : el) };
      case 'UPDATE_CARD_COUNT_IN_SIDEBOARD':
        return { ...state, deckList: state.deckList.map((el) => el.card.id === action.payload.card_id ? {...el, in_sideboard: action.payload.count } : el)};
      case 'UPDATE_COMMANDER_STATUS':
        return { ...state, deckList: state.deckList.map((el) => el.card.id === action.payload.card_id? {...el, is_commander: action.payload.is_commander} : el)};
      case 'UPDATE_COMPANION_STATUS':
        return { ...state, deckList: state.deckList.map((el) => el.card.id === action.payload.card_id ? { ...el, is_companion: action.payload.is_companion } : el) };
      case 'RESET_DECKLIST':
        return init(action.payload);
      default:
        return state;
    }
  }
  const init = (initialState) => {
    return { deckList: initialState }
  }

  const [storedDeckData, dispatch] = useReducer(deckListReducer, initialState, init);
  const [bgImage, setBgImage] = useState("");
  const [bgImageSelect, setBgImageSelect] = useState([]);
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
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
  const [deck, setDeck] = useState({});
  const [deckChange, setDeckChange] = useState(false);
  const [imagePreview, setImagePreview] = useState(cardBack);
  const [searchInput, setSearchInput] = useState("");
  const [foundCards, setFoundCards] = useState([]);
  const [dropData, setDropData] = useState("");
  const [multiface, setMultiface] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const history = useHistory();
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

  console.log(storedDeckData.deckList);
  useEffect(() => {
    let mounted = true;

    if(storedDeckData.deckList && mounted) {
      const bgMenuOptions = storedDeckData.deckList.map((card) => {
        return { value: card.card.illustration.art_crop, label: card.card.name }
      })
      // console.log(bgMenuOptions)
      setBgImageSelect(bgMenuOptions);
    }
    return () => mounted = false;
  },[storedDeckData.deckList])

  useEffect(() => {
    let mounted = true;
    let main = []
    let side = []
    // console.log(storedDeckData);
    if (storedDeckData.deckList && mounted) {
      storedDeckData.deckList.forEach((card) => {
        if (card.in_deck > 0) {
          main.push(card)
        }
        if (card.in_sideboard > 0) {
          side.push(card)
        }
      })
    }
    // console.log(main)
    //console.log(side)
    setMainDeck(main);
    setSideboard(side);
    return () => mounted = false;
  }, [storedDeckData])

  useEffect(() => {
    let mounted = true;
    // console.log(mainDeck);
    // if (mainDeck.length > 0 && mounted) {
    //   const mainCreature01 = mainDeck.filter((card) =>
    //     (parseInt(card.card.conv_mana_cost) === 0 || parseInt(card.card.conv_mana_cost) === 1) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker"))
    //   )

    if (mounted) {
      const mainCreature01 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 0 || parseInt(card.card.conv_mana_cost) === 1) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")) && card.is_commander === false
      )

      const mainCreature2 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 2) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")) && card.is_commander === false
      )

      const mainCreature3 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 3) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")) && card.is_commander === false
      )

      const mainCreature4 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 4) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")) && card.is_commander === false
      )

      const mainCreature5 = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 5) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")) && card.is_commander === false
      )

      const mainCreature6Plus = mainDeck.filter((card) =>
        (parseInt(card.card.conv_mana_cost) >= 6) && (card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")) && card.is_commander === false
      )

      const deckCommanders = mainDeck.filter((card) =>
        card.is_commander === true
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

      if(deckCommanders) {
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
    if (mounted) {
      const side01 = sideboard.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 0 || parseInt(card.card.conv_mana_cost) === 1) && (!card.card.type.includes("Land")) && card.is_companion === false
      )

      const side2 = sideboard.filter((card) =>
        parseInt(card.card.conv_mana_cost) === 2 && card.is_companion === false
      )

      const side3 = sideboard.filter((card) =>
        parseInt(card.card.conv_mana_cost) === 3 && card.is_companion === false
      )

      const side4 = sideboard.filter((card) =>
        parseInt(card.card.conv_mana_cost) === 4 && card.is_companion === false
      )

      const side5 = sideboard.filter((card) =>
        parseInt(card.card.conv_mana_cost) === 5 && card.is_companion === false
      )

      const side6Plus = sideboard.filter((card) =>
        parseInt(card.card.conv_mana_cost) >= 6 && card.is_companion === false
      )

      const sideLands = sideboard.filter((card) =>
        (parseInt(card.card.conv_mana_cost) === 0) && (card.card.type.includes("Land"))
      )

      const deckCompanion = sideboard.filter((card) =>
        card.is_companion === true
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

      if (deckCompanion) {
        setSideSlotCompanion(deckCompanion)
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
      console.log(saveFlag);
      console.log(id, username, deckName, deckDescription, bgImage.value, videoUrl);
      setSaveFlag(false);
      (async() => {
        const res = await fetch('/api/decks/build', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: id,
            creator_name: username,
            deck_name: deckName,
            description: deckDescription,
            background_img: bgImage.value,
            video_url: videoUrl,
          }),
        })

        if(!res.ok) {
          throw res;
        }

        const newDeck = await res.json();
        console.log(newDeck)
        const new_deck_id = newDeck.id;

        const res2 = await fetch(`/api/decks/${new_deck_id}/cardlist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cardList: storedDeckData.deckList
          })
        })

        if(!res2.ok) {
          throw res2;
        }

        const { card_list } = await res2.json();
        if(card_list){
          dispatch({ type: 'REPLACE_DECKLIST', payload: {cardsList: card_list }})
        }

        (async() => {
          const res3 = await fetch(`/api/decks/${new_deck_id}`)

          if(!res.ok) {
            throw res3
          }

          const data = await res3.json()
          console.log(data);

          mounted = false;
          history.push({
            pathname: `/decks/${new_deck_id}`,
            state: {data}
          });
        })()

      })()
    }
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
          // console.log(data);
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
    const data = { src: e.target.src, card_id: e.target.id, name: e.target.name, cmc: e.target.getAttribute('cmc'), keywords: e.target.getAttribute('keywords'), type: e.target.getAttribute('type'), art_crop: e.target.getAttribute('art_crop')};
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

  const selectStyles = {
    control: (styles, { isFocused }) => ({ ...styles, backgroundColor: '#21262D', borderRadius: '5px', border: isFocused ? '2px solid #E6CD8C' : '2px solid #46646E', color: '#46646E', height: '1.9rem', minHeight: '1.9rem', fontSize: '20px', lineHeight: '-5rem', '&:hover': { borderColor: isFocused ? '2px solid #E6CD8C' : '2px solid #46646E'}}),
    singleValue: styles => ({ ...styles, color: '#46646E', top: '13px'}),
    dropdownIndicator: styles => ({ ...styles, color: '#46646E', marginTop: '-8px'}),
    menu: styles => ({ ...styles, backgroundColor: '#21262D', border: '2px solid #E6CD8C', width:'97.5%', color: '#46646E' }),
    indicatorSeparator: styles => ({ ...styles, backgroundColor: '#46646E', marginTop: '5px', marginBottom: '12px'}),
    indicatorContainers: styles => ({ ...styles, alignSelf: 'center'}),
    input: styles => ({ ...styles, textAlign: 'center' }),
    placeholder: styles => ({...styles, color: '#46646E', top: '13px'}),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      //const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isSelected ? '#E6CD8C' : '#21262D',
        color: '#46646E',
        cursor: isDisabled ? 'not-allowed' : 'default',
        textAlign: 'center',
        fontSize: '20px',
      };
    },
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
          <div className="deckbuilder__display-buttons-wrapper">
            <button className="deckbuilder__container-button" title="Deck Builder" onClick={showCardContainer} >
              <GiCardExchange />
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
            <button className="deckbuilder__delete-build-button" title="Reset Deck" onClick={() => dispatch({ type: 'RESET_DECKLIST', payload: initialState })}>
              <BiReset  />
            </button>
          </div>
          <div className="deckbuilder__deck-container">
            {containerFlag && (
              <div className="deckbuilder__build-view">
                <div className="deckbuilder__search-panel">
                  <div className="deckbuilder__search-options-container">
                    <form onSubmit={handleSearch} className="deckbuilder__search-options-form">
                      <div className="deckbuilder__search-options-form-top">
                        <div className="deckbuilder__search-options-form-text-field">
                          <input type="search" results="5" ref={searchRef} onChange={(e) => setSearchInput(e.target.value)} placeholder="Find Cards"></input>
                          <button></button>
                        </div>
                      </div>
                      <div className="deckbuilder__search-options-form-filter-buttons-container"></div>
                      <button className="deckbuilder__search-options-form-submit-button">
                        <ImSearch />
                      </button>
                    </form>
                  </div>
                  <div className="deckbuilder__search-results-wrapper">
                    {/* TODO - automated highlighting buttons upon selection, two of them need special handling due to nature of svgs */}
                    {/* <div className="deckbuilder__search-results-filters">
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="m586.2 342.4c-39.4-22.2-64.6-33.3-75.7-33.3-8.1 0-14.4 6.2-18.9 18.6-4.5 12.4-13.6 18.5-27.2 18.5-5.6 0-16.9-2-34.1-6-9.6 14.6-14.4 24-14.4 28 0 5.6 4.1 12.1 12.4 19.7 8.3 7.6 15.2 11.3 20.9 11.3 3.6 0 8.5-0.7 14.7-2.3 6.2-1.5 10.3-2.3 12.4-2.3 6.2 0 9.3 11.4 9.3 34.1 0 21.7-5 55-15.1 99.9-13.1-51.5-27-77.2-41.6-77.2-2 0-6.2 1.5-12.5 4.6-6.3 3-11 4.5-14 4.5-14.6 0-27.7-13.4-39.4-40.1-23.2 3.5-34.8 15.4-34.8 35.6 0 10.1 4.7 18.2 14 24.2 9.3 6.1 14 10.4 14 12.9 0 13.6-19.9 34.6-59.8 62.8-21.2 15.1-35.8 25.7-43.9 31.8 7-9.1 14.1-20.9 21.2-35.6 8.1-16.6 12.1-29.5 12.1-38.6 0-5-5.8-12.1-17.4-21.2-11.6-9.1-17.4-18.7-17.4-28.8 0-8.6 3-19.2 9.1-31.8-6.6-7.6-14.4-11.4-23.5-11.4-20.2 0-30.3 6.6-30.3 19.7 0-9.1 0-2.3 0 20.4 0.5 16.7-12.1 25-37.9 25-19.7 0-52.7-4.6-99.2-13.6 52.5-13.1 78.7-28.3 78.7-45.4 0 2-1-4-3-18.2-2-15.6 9.1-29.8 33.3-42.4-4.5-23.2-16.6-34.8-36.3-34.8-3 0-8.6 5.3-16.6 15.9-8.1 10.6-15.6 15.9-22.7 15.9-12.1 0-27.8-13.1-46.9-39.4-9.1-13.1-23-32.5-41.6-58.3 11.6 6.1 23.2 12.1 34.8 18.2 15.1 7.1 27.3 10.6 36.3 10.6 7.1 0 14-6.2 20.8-18.6 6.8-12.4 15.8-18.6 26.9-18.6 1.5 0 11.6 3 30.3 9.1 9.6-14.6 14.4-25.5 14.4-32.6 0-6.1-3.7-13-11-20.8-7.3-7.8-14-11.7-20.1-11.7-2.5 0-6.4 0.8-11.7 2.3-5.3 1.5-9.2 2.3-11.7 2.3-9.1 0-13.6-11.4-13.6-34.1 0-6.1 5.8-40.6 17.4-103.7-0.5 7.6 2.8 21.7 9.8 42.4 8.6 25.2 18.7 37.9 30.3 37.9 2 0 6.1-1.5 12.1-4.5 6.1-3 10.8-4.5 14.4-4.5 11.6 0 21.2 6.6 28.8 19.7l11.4 20.4c10.6 0 19.4-3.8 26.5-11.3 7.1-7.6 10.6-16.7 10.6-27.3 0-11.1-4.7-19.6-14-25.4-9.4-5.8-14-10.2-14-13.2 0-10.6 16.7-28.5 50-53.7 26.7-20.2 44.2-32 52.2-35.6-21.7 29.3-32.6 50.7-32.6 64.3 0 7.1 4.3 14.6 12.9 22.7 10.6 9.6 16.7 16.4 18.2 20.4 5 11.6 4.5 27.5-1.5 47.7 13.6 9.6 24 14.4 31 14.4 14.6 0 21.9-7.6 21.9-22.7 0-1.5-0.6-6.3-1.9-14.4-1.3-8.1-1.6-12.6-1.1-13.6 2-7.1 15.9-10.6 41.6-10.6 16.2 0 49.7 4.5 100.7 13.6-11.1 3-27.8 7.6-50 13.6-20.2 6.1-30.3 12.9-30.3 20.4 0 3.5 1.3 9.6 3.8 18.2 2.5 8.6 3.8 14.9 3.8 18.9 0 7.1-4.5 13.6-13.6 19.7l-25.7 18.2c6.1 11.1 10.1 17.7 12.1 19.7 5 6.1 11.9 9.1 20.4 9.1 6.1 0 11.6-5.3 16.7-15.9 5-10.6 13.1-15.9 24.2-15.9 13.6 0 29 12.6 46.2 37.9 9.6 14.2 24.5 35.6 44.6 64.4m-168-43.9c0-32.3-11.9-60.3-35.6-84-23.7-23.7-51.7-35.6-84-35.6-32.8 0-61.1 11.7-84.8 35.2-23.7 23.5-35.8 51.6-36.3 84.4-0.5 32.3 11.5 60.2 36 83.6 24.5 23.5 52.9 35.2 85.2 35.2 34.3 0 63-11.2 85.9-33.7 23-22.4 34.2-50.8 33.7-85.1m-11.4 0c0 30.8-10.3 56.3-31 76.4-20.7 20.2-46.4 30.3-77.2 30.3-29.8 0-55.3-10.3-76.4-31-21.2-20.7-31.8-45.9-31.8-75.7 0-29.3 10.7-54.4 32.2-75.3 21.5-20.9 46.8-31.4 76.1-31.4 29.3 0 54.6 10.6 76.1 31.8 21.4 21.2 32.2 46.2 32.2 74.9" fill="#E6CD8C"/></svg>
                      </button>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="m546.93 375.53c-28.722 29.23-64.1 43.842-106.13 43.842-47.17 0-84.59-16.14-112.27-48.44-26.15-30.762-39.22-69.972-39.22-117.64 0-51.26 22.302-109.72 66.9-175.34 36.38-53.814 79.19-100.98 128.41-141.48-7.182 32.814-10.758 56.13-10.758 69.972 0 31.794 9.984 62.802 29.976 93.05 24.612 35.88 43.31 62.56 56.14 79.968 19.992 30.26 29.988 59.73 29.988 88.42.001 42.558-14.346 78.44-43.04 107.65m-.774-164.17c-7.686-17.17-16.662-28.572-26.916-34.22 1.536 3.084 2.31 7.44 2.31 13.08 0 10.77-3.072 26.14-9.234 46.13l-9.984 30.762c0 17.94 8.952 26.916 26.904 26.916 18.96 0 28.452-12.57 28.452-37.686 0-12.804-3.84-27.792-11.532-44.988" fill="#E6CD8C" transform="translate(-142.01 126.79)"/></svg>
                      </button>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="m544.2 291.7c0 33.1-12 55.7-36.1 67.7-7 3.5-29.1 8.3-66.2 14.3-24.1 4-36.1 13.3-36.1 27.8l0 60.9c0 2.5 0.8 10.3 2.3 23.3l2.3 24.1c0 7.5-1.8 19.8-5.3 36.9-9.5 2-20.6 4.3-33.1 6.8-4-15.1-6-25.3-6-30.9 0-2.5 0.6-6.3 1.9-11.3 1.2-5 1.9-8.8 1.9-11.3 0-3.5-3.1-13.3-9.4-29.3l-11.7 0c-1.5 2.5-2.1 5.8-1.6 9.8 2 8.5 2.8 15.8 2.3 21.8-8.5 6-20.3 14.1-35.4 24.1-3.5-1-4.8-1.5-3.8-1.5l0-53.4c-1-2.5-3.5-3.5-7.5-3l-9 0-9 70.7c-7 0.5-15.6 0.5-25.6 0-3.5-16.5-9.8-41.1-18.8-73.7l-6 0c-5.5 17.6-8.5 27.1-9 28.6 0 2 0.6 5.9 1.9 11.7 1.2 5.8 1.9 9.7 1.9 11.7 0 1.5-0.5 5.3-1.5 11.3l-2.3 18.1c-1 1-2.3 1.5-3.8 1.5-15 0-25.1-3.8-30.1-11.3-5-7.5-7-18.1-6-31.6l6-90.3c0-1.5 0.5-3.5 1.5-6 1-2.5 1.5-4.3 1.5-5.3 0-4-4.3-12-12.8-24.1-1.5-0.5-9.3-2.3-23.3-5.3-8.5-2-25.3-5.5-50.4-10.5-34.6-6.5-51.9-34.3-51.9-83.5 0-73.2 30.1-134.2 90.3-182.8 2.5 13.5 6.8 31.6 12.8 54.2 4.5 1 14.3 3.3 29.3 6.8 3 1 18.3 6.5 45.9 16.6-14.1-8.5-32.4-22.3-54.9-41.4-8.5-10-12.8-26.8-12.8-50.4 0-5.5 9.5-12 28.6-19.6 17-7 29.9-11 38.4-12 27.1-3.5 47.9-5.3 62.5-5.3 62.7 0 113.4 16.1 152 48.2-12.5 14.6-34.1 30.1-64.7 46.6 12.1 0.5 29.6-4.2 52.7-14.3 23.1-10 32.9-15 29.3-15 4 0 12.1 8 24.1 24.1 9 12 16.3 22.8 21.8 32.4 16 28.6 26.8 59.5 32.4 92.6 0 11.6 0.2 19.8 0.8 24.8l0 6 0 0zm-288.2 13.5c0-21.6-9.4-42-28.2-61.3-18.8-19.3-39-29-60.6-29-19.1 0-35.9 8.1-50.4 24.2-14.6 16.2-21.8 34.1-21.8 53.8 0 17.2 8.3 28.3 24.8 33.3 10.5 3 25.3 4.8 44.4 5.3l41.4 0c33.6 0.5 50.4-8.3 50.4-26.3m82 93.3 0-23.3c-3.5-6.5-7-13.3-10.5-20.3-3-10-8.5-24.1-16.6-42.1l-8.3 88c0 7-1.5 10.5-4.5 10.5-2 0-3.5-0.5-4.5-1.5-3.5-53.2-5.3-76.2-5.3-69.2l0-26.3c-1-1.5-2.2-2.3-3.7-2.3-17.1 17.6-25.6 45.9-25.6 85 0 21.6 2 34.9 6 39.9 4-1 8.5-2.8 13.5-5.3 2-1 7.8-1.5 17.3-1.5 9.5 0 21.1 3 34.6 9 5 0 7.5-13.5 7.5-40.6m170.1-104.8c0-20.2-7.5-38.2-22.6-54.1-15.1-15.9-32.4-23.8-51.9-23.8-21.1 0-40.8 9.6-59.1 29-18.3 19.3-27.5 39.5-27.5 60.6 0 17.6 8.5 26.3 25.6 26.3l86.5 0c32.6-0.5 48.9-13.1 48.9-37.9" fill="#E6CD8C" /></svg>
                      </button>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="m551.8 399.7c-22.4 53.5-67 80.2-133.6 80.2-12.2 0-25.5 1.5-39.7 4.6-21.4 4.6-32.1 11-32.1 19.1 0 2.5 1.8 5.5 5.3 8.8 3.6 3.3 6.6 5 9.2 5-12.7 0-4.1 0.4 26 1.1 30.1 0.8 48.9 1.1 56.5 1.1-44.3 26-118.4 37.9-222.3 35.9-34.1-0.5-63.4-15.5-87.8-45.1-24-28-35.9-59.3-35.9-93.9 0-36.6 12.3-67.8 37.1-93.6 24.7-25.7 55.4-38.6 92-38.6 8.1 0 19 1.8 32.5 5.3 13.5 3.6 22.5 5.3 27.1 5.3 18.8 0 42.3-7.8 70.3-23.3 28-15.5 41.3-23.3 39.7-23.3-5.1 53.5-22.9 89.4-53.5 107.7-21.9 12.7-32.8 25.2-32.8 37.4 0 7.6 4.6 13.8 13.7 18.3 7.1 3.6 15 5.4 23.7 5.4 13.2 0 26.2-8.1 39-24.4 12.7-16.3 18.3-31.1 16.8-44.3-1.5-15.3-0.5-33.6 3.1-55 1-6.1 4.7-13.6 11.1-22.5 6.4-8.9 12.1-14.4 17.2-16.4 0 4.6-1.6 12.2-5 22.9-3.3 10.7-5 18.6-5 23.7 0 11.2 3 19.9 9.2 26 9.2-3.6 17.3-15 24.4-34.4 6.1-14.8 9.7-29 10.7-42.8-21.4-1-41.9-10.7-61.5-29-19.6-18.3-29.4-38.2-29.4-59.6 0-3.6 0.5-7.1 1.5-10.7 3 4.6 7.6 11.7 13.7 21.4 8.7 12.7 15.3 19.1 19.9 19.1 6.1 0 9.2-6.4 9.2-19.1 0-16.3-4.3-31.1-13-44.3-9.7-15.8-22.2-23.7-37.4-23.7-7.1 0-17.8 3.8-32.1 11.5-14.3 7.6-27.3 11.5-39 11.5-3.6 0-19.4-4.6-47.4-13.8 49.4-8.1 74.1-15.5 74.1-22.1 0-17.3-33.9-29-101.6-35.1-6.6-0.5-18.8-1.5-36.7-3.1 2-2.5 16.5-5.3 43.5-8.4 22.9-2.5 39-3.8 48.1-3.8 121.2 0 198.1 58.8 230.7 176.5 5.6-4.6 8.4-12.4 8.4-23.2 0-13.9-4.1-31.5-12.2-52.7-3.1-8.2-7.9-20.6-14.5-37.2 41.7 53.2 62.6 103.6 62.6 151.2 0 25.1-5.9 47.8-17.6 68.3-7.6 13.8-21.9 31.5-42.8 53-20.9 21.5-35.1 38.1-42.8 49.9 28-7.6 46.4-13.5 55-17.6 19.3-8.6 36.9-21.6 52.7-39 0 6.6-2.8 16.6-8.4 29.8M218.8 99.5c0 9.2-5.1 15-15.3 17.6l-19.9 3.1c-7.1 3.6-17.6 17.6-31.3 42-1.5-7.6-3.8-18.3-6.9-32.1-4.6 0.5-12.2 4.6-22.9 12.2-4.6 3.6-12 8.9-22.2 16 3.1-18.3 13.2-36.9 30.6-55.8 18.3-20.9 36.2-31.3 53.5-31.3 22.9 0 34.4 9.4 34.4 28.3m132.9 70.3c0 8.7-4.7 15.9-14.1 21.8-9.4 5.9-18.7 8.8-27.9 8.8-12.2 0-23.2-6.9-32.8-20.6-11.7-16.8-23.7-27.7-35.9-32.9 2.5-2.5 5.6-3.8 9.2-3.8 4.6 0 12.3 3.6 23.3 10.7 10.9 7.1 17.9 10.7 21 10.7 2.5 0 6.7-3.6 12.6-10.7 5.9-7.1 12.3-10.7 19.5-10.7 16.8 0 25.2 8.9 25.2 26.7" fill="#E6CD8C" /></svg>
                      </button>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="m562.6 337.4c0 10-3.9 19-11.6 27-7.7 8-16.6 12-26.6 12-16 0-27.7-7.5-35.2-22.5l-35.2-1.5c-7.5 0-22.3 3.3-44.2 9.8-23.5 6.5-37 11.7-40.5 15.7-5.5 6-10 20-13.5 42-3 18-4.5 31.2-4.5 39.7 0 13.5 2.1 23.4 6.4 29.6 4.3 6.2 13 11.5 26.2 15.7 13.2 4.2 21.4 6.6 24.4 7.1 2 0 5.2-0.2 9.8-0.7l9 0c6.5 0 13.2 1 20.2 3 10 3 14.3 7 12.8 12-7-1-19.2 0.5-36.7 4.5l21 10.5c0 6-8.5 9-25.5 9-4.5 0-10.6-1-18.4-3-7.7-2-12.9-3-15.4-3l-9.7 0c-0.5 5-2 12.5-4.5 22.5-8.5-0.5-18.5-5.5-30-15-11.5-9.5-18.7-14.2-21.7-14.2-3 0-7.3 4.8-12.7 14.2-5.5 9.5-8.2 16-8.2 19.5-6.5-3.5-12-10-16.5-19.5-2-6.5-4.2-13-6.7-19.5-5 0.5-14.2 11-27.7 31.5l-3.8 0c-1-1.5-4.8-12-11.2-31.5-15.5-5-30-7.5-43.5-7.5-6.5 0-16.5 1.5-30 4.5l-21-1.5c3-3 11.7-8.7 26.2-17.2 17-10 30-15 39-15 1.5 0 3.5 0.3 6 0.8 2.5 0.5 4.5 0.8 6 0.8 3.5 0 9.1-1.9 16.9-5.6 7.7-3.7 12.2-7.1 13.5-10.1 1.3-3 1.9-10.8 1.9-23.2 0-28.5-7.5-49.7-22.5-63.7-13-12.5-34.5-21.5-64.5-27-8 28.5-30.5 42.7-67.4 42.7-12 0-24-7.2-36-21.7C44.7 373.8 38.7 360.6 38.7 348.6c0-18.5 7.7-33.7 23.2-45.7-12.5-13-18.7-26.2-18.7-39.7 0-12.5 3.9-23.5 11.6-33 7.7-9.5 17.9-15 30.4-16.5-1-16 4.2-27 15.7-33-5.5-5.5-8.2-15.2-8.2-29.2 0-16.5 5.5-30.2 16.5-41.2 11-11 24.7-16.5 41.2-16.5 18 0 32.7 6.3 44.2 18.8 14.5-49.5 45.7-74.2 93.7-74.2 25 0 47 10 66 30 7 7.5 10.5 11.5 10.5 12-6 0-3-1.1 9-3.4 12-2.2 20.7-3.4 26.2-3.4 19.5 0 36.7 7.2 51.7 21.7 13 13 22 29.5 27 49.5 3.5 0.5 9 2 16.5 4.5 11 5.5 16.5 15 16.5 28.5 0 2.5-2 7.3-6 14.2 32 18 48 43 48 75 0 9-3.5 21.5-10.5 37.5 13 7.5 19.5 18.5 19.5 33m-308.8 33 0-9.7c0-11.5-5.6-22-16.9-31.5-11.2-9.5-22.6-14.2-34.1-14.2-14 0-27 3.2-39 9.7 26.5-1.5 56.5 13.8 89.9 45.7m-13.5-92.9c-7.5-8.5-14-17.2-19.5-26.2-21 5.5-31.5 11.7-31.5 18.7 6-0.5 14.7 0.6 26.2 3.4 11.5 2.8 19.7 4.1 24.8 4.1m45.7-23.2 0-33c-12-2-19.3-3-21.7-3l0 11.2 21.7 24.7m97.4-21c-6-2.5-17.2-7.5-33.7-15l0 64.5c23.5-13.5 34.7-30 33.7-49.5m41.2 88.5-16.5-20.2c-10 7-20.1 14.1-30.4 21.4-10.3 7.2-19.1 15.4-26.6 24.4 22.5-12 47-20.5 73.4-25.5" fill="#E6CD8C" /></svg>
                      </button>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="M300 60A500 500 0 0 0 540 300 500 500 0 0 0 300 540 500 500 0 0 0 60 300 500 500 0 0 0 300 60m0 90A300 300 0 0 1 150 300 300 300 0 0 1 300 450 300 300 0 0 1 450 300 300 300 0 0 1 300 150" fill="#E6CD8C" /></svg>
                      </button>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="m465.4 299.6c0.3-32.1-9.8-64.4-29.8-89.6-9.6-10.6-17.6-22.7-27.8-32.8-22.5-22.4-56.2-23.8-83.4-37.9-1.6-14.1-6.7-28.3-3.6-42.6 1-4.7 2.4-9.6-0.2-14.1-7.1-16.4-1-34.2-2.3-51.3C317.4 22.4 318 11.5 309.5 6c-2 18.6-8.8 35.9-14.4 53.5-2.6 13.7-2.6 28.1-8.5 41 3.8 13.1-3.7 24.2-11.7 33.9-17.8 9.1-39 11.3-54.5 24.7-11 9.4-23 17.6-35.3 25.2-9.3 11.6-19.5 22.8-23.7 37.4-16.6 20-18.5 46.9-27.9 70.3-0.2 34.8 6.9 72.3 29.1 100.2 15.9 13.1 27 30.8 42.9 43.9 15.2 9.1 31.5 16.6 47.2 24.8 10.3 2.4 20.9 3.6 31.1 6.4 8.3 42.7 13.9 86.4 30.6 126.8 5.5-16.6 4.8-34.4 9.6-51.2 6.7-24.8-7.1-50.6 0.7-75 11.6-10.4 31-3.6 43.9-12.6 24.6-15.1 50.5-29.9 68.3-53 6.6-13.3 20.6-23.3 20.6-39.2 0.1-21.5 12.7-41.7 7.9-63.4m-182.2 131.6c-17.8-4.3-34.4-12.8-49.3-23.2-16.1-10.7-22-30.7-37.9-41.6-14.8-17.7-11.6-41.9-17.7-62.9 2.4-14.6 5.3-29.1 6.8-43.9 7.2-11.7 18.4-21.1 21.5-35.2 10.6-15.2 26.7-25.7 39.7-38.9 9.4-10.9 24.4-6.3 36.8-6.7-1.2 12-2.2 24.4 0.8 36.3 1.5 7.3 4.7 14.4 3.6 22.1-2.5 16.2 3.6 32.4-0.7 48.4-8.7 33.5 0.8 67.3 1.6 101-1.2 14.9-1.9 30-5.3 44.7m134.9-63.4c-11.8 8.4-21.8 18.7-32.1 28.7-17.9 12.4-35.5 25.4-56.8 31.6 1.9-15.2 3.8-30.8-1-45.6-11.9-33.6 2.7-68.7 5.1-102.6-2.2-20.2-0.1-41.7-9.3-60.3-1.2-14 4.8-27.4 8.9-40.6 14.1 5.6 27.3 13.2 39 22.9 14.1 10.6 35.8 17.4 38.9 37.2 1.6 13 15.8 20.8 15.4 34.1-0.9 31.5 3.5 64.5-8 94.6" fill="#E6CD8C" /></svg>
                      </button>
                      <button>
                        <img src={snowManaSymbolUnselected} style={{width:"17px"}} alt="Snow Mana Symbol"/>
                      </button>
                      <button>
                        <img src={xCostUnselected} style={{width:'19px'}} alt="X Cost Symbol"/>
                      </button>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="m304 493c27 0 79-14 79-169 0-166-45-217-87-217-34 0-76 26-76 169 0 168 49 217 84 217m0 40c-91 0-164-88-163-225 0-111 60-243 155-243 101 0 166 94 166 219 0 213-123 249-159 249" fill="#E6CD8C" /></svg>
                      </button>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="m347 52 0 373c0 49 29 48 48 48l16 0 0 50-218 0 0-50 20 0c18 0 47 0 47-48l0-239c0-47-15-51-47-50l-18 0 0-51 20 0c36 0 57-32 93-33z" fill="#E6CD8C" /></svg>
                      </button>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="m242 454 118 0c47 0 61-3 77-55l40-1-36 124-285 0-1-34C369 279 373 248 375 217c5-68-44-90-70-90-26 0-69 17-111 103L157 214C213 57 307 64 337 65c74 2 122 72 120 131-2 80-37 92-215 258z" fill="#E6CD8C" /></svg>
                      </button>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="M474 358C473 484 344 533 273 532 194 531 157 497 157 497l23-31c0 0 38 25 92 25 31 0 125-29 125-124 0-51-46-70-69-71-20 0-42 11-73 29l-17-37c110-67 127-87 127-118 0-29-26-48-49-48-23 0-56 6-117 72L167 168C246 57 316 62 337 63c47 2 103 27 104 87 0 24-8 52-62 93 46 5 96 46 95 115z" fill="#E6CD8C" /></svg>
                      </button>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="M295 351 296 156 164 351m-51 47-1-47 198-288 66 0 0 288c19 0 31-30 33-44l38 0-13 90-57 0 0 44c0 27 11 43 37 43l20 0 0 39-197 0 1-39 24 0c17 0 36-11 35-45l0-43" fill="#E6CD8C" /></svg>
                      </button>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="M449 355C448 481 338 532 251 532 201 532 151 514 151 514l15-36c0 0 35 12 72 12 41 0 131-30 131-122 0-51-34-103-105-103-37 0-70 22-80 32l-26-5 52-220 177 0c24 0 26-3 28-8l36 0-17 77-201 0-15 70c0 0 28-13 68-12 126 1 162 110 162 157z" fill="#E6CD8C" /></svg>
                      </button>
                      <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="m309 492c27 0 66-20 66-110 0-70-26-119-68-119-34 0-65 27-79 55-6 98 31 173 80 173m1 42c-91 0-161-83-161-202 0-80 51-260 267-266l0 38c-160 6-178 147-178 147 0 0 38-36 94-36 34 0 124 25 124 150 0 118-83 169-145 169" fill="#E6CD8C" /></svg>
                      </button>
                      <button>
                        <svg style={{ marginLeft: '-6px', height:'18px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1"><circle cx="300" cy="300" r="300" fill="#21262D" /><path d="m238 70 217 0-1 43c0 0-124 217-126 411l-80 0C240 386 395 139 395 139l-145 1c-42 0-54 29-64 59l-41 0 31-136 27 0c10 6 22 7 35 7z" fill="#E6CD8C" /></svg>
                        <svg style={{ position: 'absolute', height: '20px', left: '19px', top: '711px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" version="1.1">
                          <path d="M75,0 V75 H0 V125 H75 V200 H125 V125 H200 V75 H125 V0 H75 z" fill="#E6CD8C" /></svg>
                      </button>
                    </div> */}
                    <div className="deckbuilder__search-results-container">
                      {foundCards.length > 0 && foundCards.map((card, i) => (
                        <BuildSearchCardObject key={i} data={card} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} dragStart={dragStart} cardDrop={cardDrop}/>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="deckbuilder__deck-card-container">
                  <form className="deckbuilder__deck-card-container-form-fields-container">
                    <div className="deckbuilder__form-partition-1">
                      <input
                        type="text" className="deckbuild-form-input__name-field" placeholder="Deck Name"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}/>
                    </div>
                    <Select
                      className="deckbuilder__form-partition-2" placeholder="Select deck image (optional)"
                      defaultValue={bgImage}
                      options={bgImageSelect}
                      onChange={setBgImage}
                      styles={selectStyles}
                      theme={theme => ({
                        ...theme,
                        colors: {
                          ...theme.colors,
                          primary25: '#E6CD8C',
                          primary: '#46646E',
                        },
                      })}
                    />
                    {/* <div className="deckbuilder__form-partition-3">
                      <input
                        type="text"
                        className="deckbuild-form-input__video-field" placeholder="Import a play video"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}/>
                    </div> */}
                    <div className="deckbuilder__form-partition-4">
                      <textarea className="deckbuild-form-input__description-field" placeholder="Add a description (optional)"
                      maxLength="300"
                      value={deckDescription}
                      onChange={(e) => setDeckDescription(e.target.value)}></textarea>
                    </div>
                  </form>
                  <p>Drag cards here to add them to your deck</p>
                  <DeckDnd storedDeckData={storedDeckData} dispatch={dispatch}mainDeck={mainDeck} setMainDeck={setMainDeck} dropData={dropData} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction}/>
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
                <div className="deckbuilder__curve-view-special-cards">
                  <div
                   className="deckbuilder__curve-view-special-cards-commander"
                   style={commanders.length > 0 ? {display:''} : {display:"none"}}
                  >
                    <div className="deckbuilder__commander-container-title">
                      <div className="deckbuilder__commander-container-title-text">Commander</div>
                    </div>
                    <div className="deckbuilder__commander-container">
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
                   className="deckbuilder__curve-view-special-cards-companion"
                   style={sideSlotCompanion.length > 0 ? {display:''} : {display:"none"}}
                  >
                    <div className="deckbuilder__companion-container-title">
                      <div className="deckbuilder__companion-container-title-text">Companion</div>
                    </div>
                    <div className="deckbuilder__companion-container">{sideSlotCompanion.length > 0 && sideSlotCompanion.map((card, i) => (
                      <DeckCardObject
                        key={i} data={card}
                        // num={card.in_sideboard}
                        showImagePreview={hoverAction}
                        dropImagePreview={cancelHoverAction}
                      />
                    ))}</div>
                  </div>
                </div>
                <div className="deckbuilder__curve-view-grid">
                  <div className="deckbuilder__main-container1-title">
                    <div className="deckbuilder__main-container1-title-text">{`Creatures & Planeswalkers (` + mainDeck.filter((card) =>
                      card.card.type.includes("Creature") || card.card.type.includes("Planeswalker")).reduce((total, el) => total + el.in_deck, 0) + `)`}</div>
                    <div className="deckbuilder__main-container1-row-description">
                      <p>{"(CMC 0-1)"}</p>
                      <p>{"(CMC 2)"}</p>
                      <p>{"(CMC 3)"}</p>
                      <p>{"(CMC 4)"}</p>
                      <p>{"(CMC 5)"}</p>
                      <p>{"(CMC 6+)"}</p>
                    </div>
                  </div>
                  <div className="deckbuilder__main-container1">
                    <div className="deckbuilder__creature-container01">
                      {creatures0Or1.length > 0 && creatures0Or1.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckbuilder__creature-container2">
                      {creatures2.length > 0 && creatures2.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                    <div className="deckbuilder__creature-container3">

                      {creatures3.length > 0 && creatures3.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                    <div className="deckbuilder__creature-container4">
                      {creatures4.length > 0 && creatures4.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                    <div className="deckbuilder__creature-container5">
                      {creatures5.length > 0 && creatures5.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                    <div className="deckbuilder__creature-container6plus">
                      {creatures6Plus.length > 0 && creatures6Plus.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                  </div>
                  <div className="deckbuilder__land-container-title">
                    <div className="deckbuilder__land-container-title-text">{`Lands (` + mainDeck.filter((card) =>
                      card.card.type.includes("Land")).reduce((total, el) => total + el.in_deck, 0) + `)`}</div>
                  </div>
                  <div className="deckbuilder__land-container">{lands.length > 0 && lands.map((card, i) => (
                    <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                  ))}</div>
                  <div className="deckbuilder__main-container2-title">
                    <div className="deckbuilder__main-container2-title-text">{`Spells & Artifacts (` + mainDeck.filter((card) =>
                      (card.card.type.includes("Instant") || card.card.type.includes("Sorcery") || card.card.type.includes("Enchantment") || card.card.type.includes("Artifact")) && !card.card.type.includes("Creature")).reduce((total, el) => total + el.in_deck, 0) + `)`}</div>
                    <div className="deckbuilder__main-container2-row-description">
                      <p>{"(CMC 0-1)"}</p>
                      <p>{"(CMC 2)"}</p>
                      <p>{"(CMC 3)"}</p>
                      <p>{"(CMC 4)"}</p>
                      <p>{"(CMC 5)"}</p>
                      <p>{"(CMC 6+)"}</p>
                    </div>
                  </div>
                  <div className="deckbuilder__main-container2">
                    <div className="deckbuilder__spell-container01">
                      {spells0Or1.length > 0 && spells0Or1.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckbuilder__spell-container2">
                      {spells2.length > 0 && spells2.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                    <div className="deckbuilder__spell-container3">
                      {spells3.length > 0 && spells3.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                    <div className="deckbuilder__spell-container4">
                      {spells4.length > 0 && spells4.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                    <div className="deckbuilder__spell-container5">
                      {spells5.length > 0 && spells5.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                    <div className="deckbuilder__spell-container6plus">
                      {spells6Plus.length > 0 && spells6Plus.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_deck} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                  </div>
                  <div className="deckbuilder__side-container-title">
                    <div className="deckbuilder__side-container-title-text">{`Sideboard (` + sideboard.reduce((total, el) => total + el.in_sideboard, 0) + `)`}</div>
                    <div className="deckbuilder__side-container-row-description">
                      <p>{"(CMC 0-1)"}</p>
                      <p>{"(CMC 2)"}</p>
                      <p>{"(CMC 3)"}</p>
                      <p>{"(CMC 4)"}</p>
                      <p>{"(CMC 5)"}</p>
                      <p>{"(CMC 6+)"}</p>
                      <p>{"(Extra Lands)"}</p>
                    </div>
                  </div>
                  <div className="deckbuilder__side-container">
                    <div className="deckbuilder__sideslot01-container">
                      {sideSlot01.length > 0 && sideSlot01.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckbuilder__sideslot2-container">
                      {sideSlot2.length > 0 && sideSlot2.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                    <div className="deckbuilder__sideslot3-container">
                      {sideSlot3.length > 0 && sideSlot3.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                    <div className="deckbuilder__sideslot4-container">
                      {sideSlot4.length > 0 && sideSlot4.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                    <div className="deckbuilder__sideslot5-container">
                      {sideSlot5.length > 0 && sideSlot5.map((card, i) => (
                        <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                      ))}</div>
                    <div className="deckbuilder__sideslot6plus-container">
                      {sideSlot6Plus.length > 0 && sideSlot6Plus.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                    <div className="deckbuilder__sideslotlands-container">
                      {sideSlotLands.length > 0 && sideSlotLands.map((card, i) => (
                      <DeckCardObject key={i} data={card} num={card.in_sideboard} showImagePreview={hoverAction} dropImagePreview={cancelHoverAction} />
                    ))}</div>
                  </div>
                </div>
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
            <div className="deckbuilder__card-display-sticky-track">
              <div className="deckbuilder__card-display-image" style={{ backgroundImage: `url(${imagePreview})` }}></div>
              {multiface.length > 0 && <div className="deckbuilder__card-display-multiface-image" style={{ backgroundImage: `url(${imagePreview})` }}></div>}
            </div>
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
