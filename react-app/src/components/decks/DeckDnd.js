import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from "react-dnd";
import DndCardObject from './DndCardObject.js';
import Counter from '../cards/Counter.js';

const DeckDnd = (props) => {
  const { dropData, mainDeck, setMainDeck } = props;
  const [deckList, setDeckList] = useState(mainDeck);

  useEffect(() => {
    setMainDeck(deckList);
  }, [deckList]);

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    let mounted = true;
    if (mounted) {
      for(let i = 0; i < deckList.length; i++) {
        if(deckList[i].id === props.dropData.card_id) {
          return () => mounted = false;
        }
      }
      const newCard = {
        "card": {
          "id": props.dropData.card_id,
          "illustration": {
            "normal_image": props.dropData.src
          },
          "name": props.dropData.name
        },
        "in_deck": 0,
        "in_sideboard": 0
      };
      // console.log(deckList);
      deckList.push(newCard);
      // console.log(newCard);
      console.log(deckList);
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



  return (
    <div className={'dnd-list'}
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
      ref={dropRef}
    >
      {deckList.length > 0 &&
        deckList.map((card, i) => (
          <div className="dnd-card" key={i}>
            <div className="dnd-card__counter-container">
              <p>Deck</p>
              <Counter />
              <p>Side</p>
              <Counter />
            </div>
            <DndCardObject data={card} showImagePreview={props.showImagePreview} dropImagePreview={props.dropImagePreview}/>
          </div>
      ))}
    </div>
  );
};
export default DeckDnd;
