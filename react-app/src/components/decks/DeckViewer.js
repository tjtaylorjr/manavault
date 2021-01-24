import React from 'react';
import "../../stylesheets/deckviewer.css";
const DeckViewer = (props) => {
  console.log(props);
  // const {data} = props.location.state;
  // console.log(data);
  return (
    <>
      <div className="deckviewer">
        <h3>This is the deck viewer!</h3>
      </div>
    </>
  )
}

export default DeckViewer;
