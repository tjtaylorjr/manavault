import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import UserObject from "../users/UserObject";
import DeckObject from "../decks/DeckObject";
import CardObjectNormal from "../cards/SearchCardObject";
import SearchCardObject from "../cards/SearchCardObject";
import SearchBar from "./SearchBar";
import "../../stylesheets/searchresults.css";
import { RiHeartsLine, RiSearchEyeLine } from 'react-icons/ri';
import { BsEye } from 'react-icons/bs';
import { FaRegComments } from 'react-icons/fa';
import wMana from "../../assets/images/symbols/white_mana.svg";
import uMana from "../../assets/images/symbols/blue_mana.svg";
import bMana from "../../assets/images/symbols/black_mana.svg";
import rMana from "../../assets/images/symbols/red_mana.svg";
import gMana from "../../assets/images/symbols/green_mana.svg";


const SearchResults = (props) => {
  const [userQueryResults, setUserQueryResults] = useState([]);
  const [deckQueryResults, setDeckQueryResults] = useState([]);
  const [cardQueryResults, setCardQueryResults] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isUsersLoaded, setIsUsersLoaded] = useState(false);
  const [isDecksLoaded, setIsDecksLoaded] = useState(false);
  const [isCardsLoaded, setIsCardsLoaded] = useState(false);
  const { query } = useParams();

  useEffect(() => {
    if (query && query !== queryString) {
      setIsPageLoaded(false);
      setIsUsersLoaded(false);
      setIsDecksLoaded(false);
      setIsCardsLoaded(false);
      setQueryString(query);
    }
  }, [query]);

  useEffect(() => {

    let userSearch = [];
    let deckSearch = [];
    let cardSearch = [];
      (async () => {
        const res = await fetch(`/api/search/${query}`);
        if (!res.ok) {
          throw res
        }
        const search = await res.json();
        let generalSearch = []
        if (search.results.length > 0) {
          generalSearch = [...search.results]

          userSearch = [...generalSearch[0].users]
          deckSearch = [...generalSearch[1].decks]
          cardSearch = [...generalSearch[2].cards]

        }

        if (userSearch.length > 0) {
          // const uniqueUserResults = (() => {
          //   const checkProp = userSearch.map(obj => obj['id']);
          //   return userSearch.filter((obj, idx) => {
          //     return checkProp.indexOf(obj['id']) === idx;
          //   })
          // })()

          setUserQueryResults(userSearch)
        }

        if (deckSearch.length > 0) {
          // const uniqueDeckResults = (() => {
          //   const checkProp = deckSearch.map(obj => obj['id']);
          //   return deckSearch.filter((obj, idx) => {
          //     return checkProp.indexOf(obj['id']) === idx;
          //   })
          // })()

          // const sortedDeckResults = (() => {
          //   let perfectMatches = [];
          //   let notPerfectMatches = [];
          //   for ( let i = 0; i < uniqueDeckResults.length; i++ ) {
          //     if (uniqueDeckResults[i] === query) {
          //       perfectMatches.push(uniqueDeckResults[i])
          //     } else {
          //       notPerfectMatches.push(uniqueDeckResults[i])
          //     }
          //   }

          //   return perfectMatches.concat(notPerfectMatches)
          // })()

          setDeckQueryResults(deckSearch)
        }

        if (cardSearch.length > 0) {
          // const uniqueCardResults = (() => {
          //   const checkProp = cardSearch.map(obj => obj['uuid']);
          //   return cardSearch.filter((obj, idx) => {
          //     return checkProp.indexOf(obj['id']) === idx;
          //   })
          // })()

          // const sortedCardResults = (() => {
          //   let perfectMatches = [];
          //   let notPerfectMatches = [];
          //   for (let i = 0; i < uniqueCardResults.length; i++) {
          //     if (uniqueCardResults[i] === query) {
          //       perfectMatches.push(uniqueCardResults[i])
          //     } else {
          //       notPerfectMatches.push(uniqueCardResults[i])
          //     }
          //   }

          //   return perfectMatches.concat(notPerfectMatches)
          // })()

          // setCardQueryResults(sortedCardResults)
          setCardQueryResults(cardSearch)
        }

      })();
    setIsPageLoaded(true);
  }, [queryString]);

  useEffect(() => {
    setIsUsersLoaded(true)
  }, [userQueryResults])

  useEffect(() => {
    setIsDecksLoaded(true)
  }, [deckQueryResults])

  useEffect(() => {
    setIsCardsLoaded(true)
  }, [cardQueryResults])

  const userResultsRender = () => {
    return isPageLoaded && isUsersLoaded && userQueryResults.length !== 0 ? (
      <>
        <div className="search-page__results-container">
          <h3 className="search-page__results-subheader">
            {'Found ' + userQueryResults.length + (userQueryResults.length > 1 ? ' Users' : ' User')}
          </h3>
          <ul className='search-page__results-list'>
            {userQueryResults.map((user, i) => (
              <UserObject key={i} data={user} />
            ))}
          </ul>
        </div>
      </>
    ) :
      <>
        <div className="search-page__results-container">
        </div>
      </>

  }

  const deckResultsRender = () => {
    return isPageLoaded && isDecksLoaded && deckQueryResults.length !== 0 ? (
      <>
        <div className="search-page__results-container">
          <h3 className="search-page__results-subheader">
            {'Found ' + deckQueryResults.length + (deckQueryResults.length > 1 ? ' Decks' : ' Deck')}
          </h3>
          <ul className='search-page__results-list'>
            {deckQueryResults.map((deck, i) => (
              <div key={i} className="search-page__results-list-deck-item">
                <div className="search-page__results-list-deck-item-mana">
                  {deck.color_identity.indexOf('W') > -1 && <img src={wMana} alt="white mana" />}
                  {deck.color_identity.indexOf('U') > -1 && <img src={uMana} alt="blue mana" />}
                  {deck.color_identity.indexOf('B') > -1 && <img src={bMana} alt="black mana" />}
                  {deck.color_identity.indexOf('R') > -1 && <img src={rMana} alt="red mana" />}
                  {deck.color_identity.indexOf('G') > -1 && <img src={gMana} alt="green mana" />}
                </div>
                <h4>{deck.deck_name}</h4>
                <p>{'by ' + deck.creator_name}</p>
                <div className="decksbrowser__deck-list-item-indicators">
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
                <DeckObject key={i} data={deck} />
              </div>
            ))}
          </ul>
        </div>
      </>
    ) :
      <>
        <div className="search-page__results-container">
        </div>
      </>
  }

  const cardResultsRender = () => {
    return isPageLoaded && isCardsLoaded && cardQueryResults.length !== 0 ? (
      <>
        <div className="search-page__results-container">
          <h3 className="search-page__results-subheader">
            {'Found ' + cardQueryResults.length + (cardQueryResults.length > 1 ? ' Cards' : ' Card')}
          </h3>
          <ul className='search-page__results-list'>
            {cardQueryResults.map((card, i) => (
              <SearchCardObject key={i} data={card} />
            ))}
          </ul>
        </div>
      </>
    ) : (
      <>
      <div className="search-page__results-container"></div>
      </>
    )
  }

  return (
    <>
      {isPageLoaded &&
      <div className="search-page">
        <div className="search-page__buffer">
          <div className="search-page__search">
            <div className="search-page__searchbar-container">
              <SearchBar />
            </div>
          </div>
        </div>
        <h3 className="search-page__header">Displaying results for {queryString}</h3>
        <div className="search-page__main">
          <section className="search-page__results">
            {userResultsRender()}
          </section>
          <section className="search-page__results">
            {deckResultsRender()}
          </section>
          <section className="search-page__results">
            {cardResultsRender()}
          </section>
        </div>
      </div>
      }
      {!isPageLoaded &&
      <div className="search-page">
        <div className="search-page__buffer">
          <div className="search-page__search">
            <div className="search-page__searchbar-container">
              <SearchBar />
            </div>
          </div>
        </div>
        <h3 className="search-page__header">Searching for {query}...</h3>
        <div className="search-page__main">
        </div>
      </div>
      }
    </>
  )
}

export default SearchResults;
