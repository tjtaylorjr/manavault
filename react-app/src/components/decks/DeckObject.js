import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import W from "../../assets/images/symbols/white_mana.svg";
import U from "../../assets/images/symbols/blue_mana.svg";
import B from "../../assets/images/symbols/black_mana.svg";
import R from "../../assets/images/symbols/red_mana.svg";
import G from "../../assets/images/symbols/green_mana.svg";

const DeckObject = ( deck ) => {
  const [deckIMG, setDeckIMG] = useState("");
  const {data} = deck;
  const history = useHistory();

  useEffect(() => {
    setDeckIMG(data.background_img)
  },[data.background_img])

  const renderDeckPage = () => {
    history.push({
      pathname: `/decks/${data.id}`,
      state: {data}
    });
  };

  const renderUserProfile = () => {
    history.push(`/users/${data.user_id}`)
  }

  return (
    <section className="deck-object-container">
      <div className="deck-object__wrapper">
        {/* <div className="deck-object__displaycard"></div> */}
        {/* <h4 onClick={renderDeckPage}>{data.deck_name}</h4> */}
        {/* <p className="deck-object__creator" onClick={renderUserProfile}>{'by ' + data.creator_name}</p> */}
        <div className="deck-object__3d-render" onClick={renderDeckPage}>
          <div className="deck-object__3d-render-deckbox">
            <div className="deck-object__3d-render-deckbox-front">
              {deckIMG ? (
                <>
                  <div className="deck-object__3d-render-deckbox-front-top" style={{ backgroundImage: `url(${deckIMG})` }}></div>
                  <div className="deck-object__3d-render-deckbox-front-bottom" style={{ backgroundImage: `url(${deckIMG})` }}></div>
                </>
              ) : null}
            </div>
            <div className="deck-object__3d-render-deckbox-back"></div>
            <div className="deck-object__3d-render-deckbox-right"></div>
            <div className="deck-object__3d-render-deckbox-left">
              <div className="deck-object__3d-render-deckbox-left-top">
                {deckIMG ? (
                    <div className="deck-object__3d-render-deckbox-left-top-img" style={{ backgroundImage: `url(${deckIMG})` }}></div>
                ) : null}
              </div>
              <div className="deck-object__3d-render-deckbox-left-bottom">
                {deckIMG ? (
                  <div className="deck-object__3d-render-deckbox-left-bottom-img" style={{ backgroundImage: `url(${deckIMG})` }}></div>
                ) : null}
              </div>
            </div>
            <div className="deck-object__3d-render-deckbox-top">
                <h1>Spark</h1>
            </div>
            <div className="deck-object__3d-render-deckbox-bottom"></div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default DeckObject;
