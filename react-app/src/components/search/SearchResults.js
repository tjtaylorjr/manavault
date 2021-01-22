import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import UserObject from "../users/UserObject";
import DeckObject from "../decks/DeckObject";
import CardObject from "../cards/CardObject";
import SearchBar from "./SearchBar";


const SearchResults = () => {
  const [userQueryResults, setUserQueryResults] = useState([]);
  const [deckQueryResults, setDeckQueryResults] = useState([]);
  const [cardQueryResults, setCardQueryResults] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const { query } = useParams();
  // console.log(query)
  useEffect(() => {
    if (query) {
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
          console.log(generalSearch)
          userSearch = [...generalSearch[0].users]
          deckSearch = [...generalSearch[1].decks]
          cardSearch = [...generalSearch[2].cards]
          console.log(userSearch, deckSearch, cardSearch)
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
          // console.log(sortedCardResults)
          // setCardQueryResults(sortedCardResults)
          setCardQueryResults(cardSearch)
        }

      })();
    setIsLoaded(true);
  }, [queryString]);

  const userResultsRender = () => {
    return userQueryResults ? (
      userQueryResults.length === 0 ?
        <div className="search-page__container">
        </div> :
        <>
          <div className="search-page__container">
            <h3 className="search-page__subheader">
              {'Found ' + userQueryResults.length + (userQueryResults.length > 1 ? ' Users' : ' User')}
            </h3>
            <ul className='search-page__list'>
              {userQueryResults.map((user, i) => (
                <UserObject key={i} data={user} />
              ))}
            </ul>
          </div>
        </>
    ) :
        <>
          <div className="search-page__container">
          </div>
        </>

  }

  const deckResultsRender = () => {
    return deckQueryResults ? (
      deckQueryResults.length === 0 ?
        <div className="search-page__container">
        </div> :
        <>
          <div className="search-page__container">
            <h3 className="search-page__subheader">
              {'Found ' + deckQueryResults.length + (deckQueryResults.length > 1 ? ' Decks' : ' Deck')}
            </h3>
            <ul className='search-page__list'>
              {deckQueryResults.map((deck, i) => (
                <DeckObject key={i} data={deck} />
              ))}
            </ul>
          </div>
        </>
    ) :
      <>
        <div className="search-page__container">
        </div>
      </>

  }

  const cardResultsRender = () => {
    return cardQueryResults ? (
      cardQueryResults.length === 0 ?
        <div className="search-page__container">
        </div> :
        <>
          <div className="search-page__container">
            <h3 className="search-page__subheader">
              {'Found ' + cardQueryResults.length + (cardQueryResults.length > 1 ? ' Cards' : ' Card')}
            </h3>
            <ul className='search-page__list'>
              {cardQueryResults.map((card, i) => (
                <CardObject key={i} data={card} />
              ))}
            </ul>
          </div>
        </>
    ) :
      <>
        <div className="search-page__container">
        </div>
      </>

  }

  return (
    <>
      <div className="search-page">
        <div className="search-page__buffer">
          <div className="search-page__search">
            <div className="search-page__searchbar-container">
              <SearchBar />
            </div>
          </div>
        </div>
        <h3 className="search-page__header">Displaying Results for {queryString}</h3>
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
    </>
  )
}

export default SearchResults;
