import React from 'react'

const DeckObject = ({ deck }) => {
  console.log(deck)
  return (
    <p style={{ color: "#FFF" }}>{deck.deck_name}</p>
  )
}

export default DeckObject;
