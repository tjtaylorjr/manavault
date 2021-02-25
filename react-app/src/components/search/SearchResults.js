import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import UserObject from "../users/UserObject";
import DeckObject from "../decks/DeckObject";
import CardObject from "../cards/CardObject";
import SearchBar from "./SearchBar";
import "../../stylesheets/searchresults.css";


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
              <div className="search-page__results-list-deck-item">
                <h4>{deck.deck_name}</h4>
                <p>{'by ' + deck.creator_name}</p>
                <div></div>
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
              <CardObject key={i} data={card} />
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
