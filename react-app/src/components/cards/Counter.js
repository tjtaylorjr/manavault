import React, { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';


export const Counter = (props) => {
  const [count, setCount] = useState(0);
  const [upCount, setUpCount] = useState(false);
  const [downCount, setDownCount] = useState(false);
  const [counterID, setCounterID] = useState("");
  const { association, card_id, dispatch } = props;
  console.log(props);
  console.log(props.card_id);
  console.log(card_id);

  useEffect(() => {
    let mounted = true;
    if(card_id && mounted) {
      setCounterID(card_id);
    }
    return () => mounted = false;
  },[props.card_id])
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
      dispatch({type: 'UPDATE_CARD_COUNT_IN_DECKLIST', location: association, payload: {card_id: counterID, count: count}});
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
