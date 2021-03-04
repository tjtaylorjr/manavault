import React, { useEffect, useState } from 'react';

const CardDesignationButtons = (props) => {
  const [updateCommander, setUpdateCommander] = useState(false);
  const [updateCompanion, setUpdateCompanion] = useState(false);
  const [commanderIsSelected, setCommanderIsSelected] = useState(props.data.isCommander);
  const [companionIsSelected, setCompanionIsSelected] = useState(props.data.isCompanion);
  const [buttonsID, setButtonsID] = useState("");
  const [deck, setDeck] = useState([]);
  const [cardId, setCardId] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardKeywords, setCardKeywords] = useState("");

  console.log(props);
  // const selectionColor = isSelected ? {backgroundColor:'green'} : {backgroundColor:'red'};

  const {
    deckBuilderData,
    dispatch,
    data
  } = props;

  const {deckList} = deckBuilderData;
  const { card } = data;

  const {
    id,
    keywords,
    type
  } = card;

  console.log(id);
  console.log(keywords);
  console.log(type);

  console.log(deckList);
  console.log(card);
  useEffect(() => {
    let mounted = true;

    if(deckList && mounted) {
      setDeck(deckList)
    }

    if(id && mounted) {
      setCardId(id);
    }

    if (type && mounted) {
      setCardType(type);
    }

    if (keywords && mounted) {
      setCardKeywords(keywords);
    }

    return () => mounted = false;
  },[props])

  useEffect(() => {
    let mounted = true;
    if(id && mounted) {
      setButtonsID(id);
    }
    return () => mounted = false;
  },[id]);

  useEffect(() => {
    let mounted = true;

    if(mounted) {
      let idx = -1;
      for (let i = 0; i < deckList.length; i++) {
        if (deckList[i].card.id == cardId) {
          idx = i;
        }
      }

      if(idx > -1) {
        setCommanderIsSelected(deckList[idx].isCommander);
        setCompanionIsSelected(deckList[idx].isCompanion);
      }
    }

  },[deckList]);


  useEffect(() => {
    let mounted = true;

    if(updateCommander && mounted){
      dispatch({ type: 'UPDATE_COMMANDER_STATUS', payload: {card_id: buttonsID, isCommander: commanderIsSelected}})
    }

    if(updateCompanion && mounted){
      dispatch({ type: 'UPDATE_COMPANION_STATUS', payload: {card_id: buttonsID, isCompanion: companionIsSelected}})
    }

    setUpdateCommander(false)
    setUpdateCompanion(false)
  }, [updateCommander, updateCompanion]);

  const HandleCommanderUpdate = () => {
    setUpdateCommander(true);
    setCommanderIsSelected(!commanderIsSelected);
  }

  const HandleCompanionUpdate = () => {
    setUpdateCompanion(true);
    setCompanionIsSelected(!companionIsSelected);
  }

  // const commanderButton = props.data.card.type.includes("Legendary Creature") && !companionIsSelected && (
  //       <button className="commander-button" onClick={HandleCommanderUpdate} style={commanderIsSelected ? { color: '#21262D', backgroundColor: '#E6CD8C', border: '1.53px outset #21262D' } : { color: '#E6CD8C', backgroundColor: '#21262D', border: '1.5px outset #E6CD8C' }}>Commander</button>
  // )
  // const companionButton = props.data.card.keywords.includes("Companion") && !commanderIsSelected && (
  //       <button className="companion-button" onClick={HandleCompanionUpdate} style={companionIsSelected ? { color: '#21262D', backgroundColor: '#E6CD8C', border: '1.5px outset #21262D' } : { color: '#E6CD8C', backgroundColor: '#21262D', border: '1.5px outset #E6CD8C' }}>Companion</button>
  //     )

  return (
    <div className="designation-buttons__container">
      {cardType.includes("Legendary Creature") && !companionIsSelected &&
        <button className="commander-button" onClick={HandleCommanderUpdate} style={commanderIsSelected ? { color: '#21262D', backgroundColor: '#E6CD8C', border: '1.53px outset #21262D' } : { color: '#E6CD8C', backgroundColor: '#21262D', border: '1.5px outset #E6CD8C'}}>Commander</button>
      }
      {cardKeywords.includes("Companion") && !commanderIsSelected &&
        <button className="companion-button" onClick={HandleCompanionUpdate} style={companionIsSelected ? { color: '#21262D', backgroundColor: '#E6CD8C', border: '1.5px outset #21262D' } : { color: '#E6CD8C', backgroundColor: '#21262D', border: '1.5px outset #E6CD8C' }}>Companion</button>
      }
    </div>
  )
}

export default CardDesignationButtons;
