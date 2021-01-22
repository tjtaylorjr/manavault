import React from 'react'

const DeckObject = ({ deck }) => {
  const {data} = deck
  return (
    <p style={{ color: "#FFF" }}>{deck.deck_name}</p>
  )
}

export default DeckObject;
