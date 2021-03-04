import React, { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';


export const Counter = (props) => {
  const [count, setCount] = useState(0);
  const [upCount, setUpCount] = useState(false);
  const [downCount, setDownCount] = useState(false);
  const [counterID, setCounterID] = useState("");
  const { association, card_id, dispatch, deckList } = props;
  // console.log(props);
  // console.log(deckList);
  // console.log(props.card_id);
  // console.log(card_id);
  useEffect(() => {
    let mounted = true;
    if(card_id && mounted) {
      if (card_id.includes("deckBuilder")) {
        setCounterID(card_id.slice(11));
      } else {
        setCounterID(card_id);
      }
    }
    return () => mounted = false;
  },[props.card_id])

  useEffect(() => {
    let mounted = true;

    if(mounted) {
      let idx = -1;
      for(let i = 0; i < deckList.length; i++) {
        if(deckList[i].card.id == card_id) {
          idx = i;
        }
      }
      // console.log(deckList[idx])
      // console.log(association)

      if(idx === undefined || idx === NaN || idx < 0) {
        setCount(0)
      } else if(association === "in_deck"){
        const newValue = deckList[idx].in_deck
        // console.log(newValue)
        setCount(newValue)
      } else {
        const newValue = deckList[idx].in_sideboard
        // console.log(newValue)
        setCount(newValue)
      }

      // if(idx > -1 && !undefined){
      //   console.log(deckList[idx].association)
      //   const newValue = deckList[idx].association;
      //   console.log(parseInt(newValue));
      //   setCount(newValue);
      // } else {
      //   setCount(0);
      // }
    }
    return () => mounted = false;

    // const idx = deckList.filter((el, i )=> {
    //   if(el.id === card_id){
    //     return i
    //   }
    // })
    // console.log(idx);
    // if(mounted) {
    //   setCount(deckBuilderData.deckList.)
    // }
  },[deckList])
  useEffect(() => {
    // let mounted = true;
    // if (upCount && mounted) {
    //   setCount(count + 1);
    // }
    // if (downCount && mounted) {
    //   if (count - 1 < 0) {
    //     setCount(0)
    //   } else {
    //     setCount(count - 1)
    //   }
    // }
    if(upCount || downCount) {
      // const referenceID = props.card_id;
      // console.log(referenceID)
      // const location = `el.`+association
      let dispatchType;

      if(association === "in_deck") {
        dispatchType = 'UPDATE_CARD_COUNT_IN_MAINDECK';
      }
      if(association === "in_sideboard") {
        dispatchType = 'UPDATE_CARD_COUNT_IN_SIDEBOARD';
      }

      dispatch({type: dispatchType, payload: {card_id: counterID, count: count}});
      setUpCount(false);
      setDownCount(false);
    }
    // return () => mounted = false;
  }, [upCount, downCount])

  const increaseCount = () => {
    setCount(count + 1);
    setUpCount(true);
  };

  const decreaseCount = () => {
    if (count - 1 < 0) {
      setCount(0)
    } else {
      setCount(count - 1)
    }
    setDownCount(true);
  };

  const num = count;
  return (
    <div className="counter">
      <AiOutlinePlusCircle className="counter__plus" onClick={increaseCount} />
      <div className="counter__display">{count}</div>
      <AiOutlineMinusCircle className="counter__minus" onClick={decreaseCount} />
    </div>

  )
}

export default Counter;
