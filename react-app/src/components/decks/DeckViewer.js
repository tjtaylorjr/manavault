import React from 'react';
import { useLocation } from "react-router-dom";
import CommentBox from "../social/CommentBox.js";
import { AiFillDislike, AiFillLike, } from 'react-icons/ai';
const DeckViewer = (props) => {

  const location = useLocation();
  const deck = location.state.data;
  console.log(deck);

  const {id, username} = props.user;
  console.log(props)
  const creator = deck.creator_name;
  const deckName = deck.deck_name;


  return (
    <>
      <div className="deckviewer">
        <h3>This is the deck viewer!</h3>
        <CommentBox authenticated={props.authenticated} user_id={id} username={username} creator={creator} deckName={deckName} />
      </div>
    </>
  )
}

export default DeckViewer;
