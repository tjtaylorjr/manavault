import React, { useEffect, useRef, useState } from "react";
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import DeckObject from './DeckObject.js';
import { IoBuild } from 'react-icons/io5'



function DecksBrowser() {
  const [option, setOption] = useState("");
  const [decks, setDecks] = useState([]);

  const history = useHistory();

  const optionSelect = [
    { value: "Latest", label: "Latest" },
    { value: "Most Discussed", label: "Most Discussed" },
    { value: "Most Liked", label: "Most Liked" },
  ];

  // { value: "Most Viewed", label: "Most Viewed" },

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        const res = await fetch("/api/decks/browse");
        if (!res.ok) {
          throw res;
        }

        const data = await res.json();

        if (data) {
          setDecks(data.decks);
        }
      })()
    }
    return () => mounted = false;
  },[]);

  useEffect(() => {
    let mounted = true;

    if (option.value && mounted) {
      if(option.value === "Latest") {
        (async () => {
          const res = await fetch("/api/decks/browse/latest");
          if (!res.ok) {
            throw res;
          }

          const data = await res.json();

          if (data) {
            setDecks(data.decks);
          }
        })()
      }

      if (option.value === "Most Liked") {
        (async () => {
          const res = await fetch("/api/decks/browse/most-liked");
          if (!res.ok) {
            throw res;
          }

          const data = await res.json();

          if (data) {
            setDecks(data.decks);
          }
        })()
      }

      if (option.value === "Most Viewed") {
        (async () => {
          const res = await fetch("/api/decks/browse/most-viewed");
          if (!res.ok) {
            throw res;
          }

          const data = await res.json();

          if (data) {
            setDecks(data.decks);
          }
        })()
      }
    }

    return () => mounted = false;
  },[option]);

  console.log(decks);
  const deckObjects = decks.map((deck, i) => {
    return (
        <DeckObject key={i} data={deck} />
    );
  });

  return (
    <div className="decksbrowser">
      <div className="deckbrowser__header">
        <Select
          className="decksbrowser__select-bar"
          placeholder="Pick a Category"
          defaultValue={option}
          options={optionSelect}
          onChange={setOption}
        />
        <button title="Build" className="deckbrowser__header-button" onClick={() => history.push("/decks/build")}>
          <IoBuild />
        </button>
      </div>
      <div className="decksbrowser__deck-list">
        <div className="decksbrowser__deck-list-wrapper">
          {decks.map((deck, i) => (
            <div className="decksbrowser__deck-list-item">
              <h4>{deck.deck_name}</h4>
              <p>{'by ' + deck.creator_name}</p>
              <div></div>
              <DeckObject key={i} data={deck} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DecksBrowser;
