import React, { useEffect, useReducer, useState } from 'react';
import { useDrag, useDrop } from "react-dnd";
import DndCardObject from './DndCardObject.js';
import Counter from '../cards/Counter.js';

const DeckDnd = (props) => {
  const { dropData, deckBuilderData, dispatch } = props;
  console.log(dropData);
  const [currentCard, setCurrentCard] = useState({});
  const [cards, setCards] = useState([]);
  // const { deckList } = deckBuilderData;
  // console.log(deckList)

  // const initialState = [];
  // const deckListReducer = (state, action) => {
  //   switch (action.type) {
  //     case 'ADD_CARD_TO_DECKLIST':
  //       return {...state, deckList: state.deckList.concat(action.newCard)};
  //     case 'RESET_DECKLIST':
  //       return init(action.payload);
  //     default:
  //       return state;
  //   }
  // }
  // const init = (initialState) => {
  //   return {deckList: initialState}
  // }
  // const [deckBuilderData, dispatch] = useReducer(deckListReducer, initialState, init);
  // const [deckList, setDeckList] = useState(mainDeck);
  useEffect(()=> {
    let mounted = true;
    if(dropData && mounted) {
      setCurrentCard(dropData);
    }
    return () => mounted = false;
  },[dropData]);

  useEffect(() => {
    setCards(deckBuilderData.deckList);
    // setMainDeck(deckBuilderData.deckList);
  }, [deckBuilderData.deckList]);

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    console.log("leaving the area")
    console.log(currentCard)
    const referenceID = currentCard.card_id.includes("deckBuilder") ? currentCard.card_id.slice(11) : currentCard.card_id
    console.log(referenceID)
    dispatch({type: 'REMOVE_CARD_FROM_DECKLIST', payload: referenceID});
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragStart = (e) => {
    console.log(e.target);
    // console.log(e.target.name);
    const data = { src: e.target.src, card_id: e.target.id, name: e.target.name, cmc: e.target.getAttribute('cmc')};
    setCurrentCard(data);
  }

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    let mounted = true;
    if (mounted) {
      // for(let i = 0; i < deckList.length; i++) {
      //   if(deckList[i].id === dropData.card_id) {
      //     return () => mounted = false;
      //   }
      // }
      const existingCardIds = deckBuilderData.deckList.map(el => el.card.id)
      console.log(existingCardIds)
      const newCard = {
        "card": {
          "id": currentCard.card_id.includes("deckBuilder") ? currentCard.card_id.slice(11) : currentCard.card_id,
          "conv_mana_cost": currentCard.cmc,
          "illustration": {
            "normal_image": currentCard.src
          },
          "name": currentCard.name
        },
        "in_deck": 0,
        "in_sideboard": 0
      };

      if(!existingCardIds.includes(newCard.card.id)) {
        dispatch({ type: 'ADD_CARD_TO_DECKLIST', newCard});
      }
      // console.log(deckList);
      // deckList.push(newCard);
      // console.log(newCard);
    }
    // console.log(props.dropData)
    return () => mounted = false;
  };

  const moveCard = (dropData) => {
    // console.log("this card has been moved");
    // SetMainDeck(...mainDeck, newCard)
  }

  const [{ isOver }, dropRef] = useDrop({
    accept: "card",
    drop: () => moveCard(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const dragAndDropCards = deckBuilderData.deckList.length > 0 && cards.map((card, i) => (
    <div className="dnd-card" key={i}>
      <div className="dnd-card__counter-container">
        <p>Deck</p>
        <Counter dispatch={dispatch} deckBuilderData={deckBuilderData} deckList={cards} association={"in_deck"} card_id={card.card != undefined && card.card.id} />
        <p>Side</p>
        <Counter dispatch={dispatch} deckBuilderData={deckBuilderData} deckList={cards} association={"in_sideboard"} card_id={card.card != undefined && card.card.id} />
      </div>
      <DndCardObject dragStart={dragStart} data={card} showImagePreview={props.showImagePreview} dropImagePreview={props.dropImagePreview} />
    </div>
  ))


  return (
    <div className="dnd-list"
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
      ref={dropRef}
    >
      {dragAndDropCards}
    </div>
  );
};
export default DeckDnd;
