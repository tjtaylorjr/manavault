import React, { useEffect, useState } from "react";
import '../../stylesheets/index.css';
import SearchBar from "../search/SearchBar";
import DeckObject from '../decks/DeckObject.js';
import wMana from "../../assets/images/symbols/white_mana.svg";
import uMana from "../../assets/images/symbols/blue_mana.svg";
import bMana from "../../assets/images/symbols/black_mana.svg";
import rMana from "../../assets/images/symbols/red_mana.svg";
import gMana from "../../assets/images/symbols/green_mana.svg";
import { RiHeartsLine } from 'react-icons/ri';
import { BsEye } from 'react-icons/bs';
import { FaRegComments } from 'react-icons/fa';


const Main = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [latestDecks, setLatestDecks] = useState([]);

  useEffect(() => {
    setIsLoaded(false);
    (async () => {
      const res = await fetch(`/api/decks/latest`);

      if(!res.ok) {
        throw res;
      }

      const payload = await res.json();
      // console.log(payload);
      if(payload) {
        setLatestDecks(payload.decks);
      }
    })()
  },[])

  useEffect(() => {
    let mounted = true;
    if(latestDecks.length > 0 && mounted) {
      setIsLoaded(true);
    }
  },[latestDecks])

  return (
    <>
      <div className="splash">
        <div className="splash-contents">
          <div className="splash-background">
            <div className="splash-search">
              <SearchBar />
            </div>
          </div>
          {isLoaded && (

            <div className="latest-decks">
              <h1 style={{fontSize: '30px'}}>Latest Decks</h1>
              <div className="deck-container">
                {latestDecks.map((deck, i) => (
                  <div key={i} className="main__deck-list-item">
                    <div className="main__deck-list-item-mana">
                      {deck.color_identity.indexOf('W') > -1 && <img src={wMana} alt="white mana" />}
                      {deck.color_identity.indexOf('U') > -1 && <img src={uMana} alt="blue mana" />}
                      {deck.color_identity.indexOf('B') > -1 && <img src={bMana} alt="black mana" />}
                      {deck.color_identity.indexOf('R') > -1 && <img src={rMana} alt="red mana" />}
                      {deck.color_identity.indexOf('G') > -1 && <img src={gMana} alt="green mana" />}
                    </div>
                    <h4>{deck.deck_name}</h4>
                    <p>{'by ' + deck.creator_name}</p>
                    <div className="main__deck-list-item-indicators">
                      <div>
                        <BsEye style={{ fill: "#FF6000", margin: "0 5px" }} />
                        {deck.total_views}
                      </div>
                      <div style={{ color: "FF6000" }}>
                        <RiHeartsLine style={{ fill: "#FF6000", margin: "0 5px" }} />
                        {deck.total_likes}
                      </div>
                      <div>
                        <FaRegComments style={{ fill: "#FF6000", margin: "0 5px" }} />
                        {deck.total_comments}
                      </div>
                    </div>
                    <DeckObject data={deck} />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="News"></div>
          <div className="disclaimer">
            {/* <p>Art featured on this page is Ancient Hellkite and was illustrated by Jason Chan.  Portions of the materials used on this site, including Ancient Hellkite, are property of Wizards of the Coast. ©Wizards of the Coast LLC.</p>
            <p>Wizards of the Coast, Magic: The Gathering, and their logos are trademarks of Wizards of the Coast LLC in the United States and other countries. © 1993-2021 Wizards. All Rights Reserved.</p>
            <p>This site is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC. We may use the trademarks and other intellectual property of Wizards of the Coast LLC, which is permitted under Wizards' Fan Site Policy. MAGIC: THE GATHERING® is a trademark of Wizards of the Coast. For more information about Wizards of the Coast or any of Wizards' trademarks or other intellectual property, please visit their website at https://company.wizards.com/.</p> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Main;
