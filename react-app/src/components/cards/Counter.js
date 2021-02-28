import React, { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';


export const Counter = () => {
  const [count, setCount] = useState(0);
  const [upCount, setUpCount] = useState(false);
  const [downCount, setDownCount] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (upCount && mounted) {
      setCount(count + 1);
    }
    if (downCount && mounted) {
      if (count - 1 < 0) {
        setCount(0)
      } else {
        setCount(count - 1)
      }
    }
    setUpCount(false);
    setDownCount(false);
    return () => mounted = false;
  }, [upCount, downCount])

  const increaseCount = () => {
    setUpCount(true);
  };

  const decreaseCount = () => {
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
