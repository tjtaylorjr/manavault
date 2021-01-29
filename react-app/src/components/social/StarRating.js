import React, { useState } from 'react';
// import { render } from "react-dom";
import {BsStarFill, BsStarHalf, BsStar} from 'react-icons/bs';

const Star = ({ selected = false, onClick = f => f }) => (
  <div className = { selected ? 'star-rating__star star-rating__selected' : 'star-rating__star'} onClick={onClick} />
)

const totalStars = 5;

const StarRating = ({ totalStars }) => {
  const [starSelected, selectStar] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((n, i) => (
        <Star
          key={i}
          selected={i < starsSelected}
          onClick={() => this.change(i + 1)}
        />
      ))}
      <p className="star-rating__description">
        {starsSelected} out of {totalStars} stars
      </p>
    </div>
  );
};

// render(<StarRating totalStars={5} />, document.getElementById('root'));

// TO DO want to make this more flexible with css by using clip value to reveal underlying color and render stars to the tenth decimal position.

export default StarRating;
