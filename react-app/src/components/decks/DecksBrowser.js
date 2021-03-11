import React, { useEffect, useRef, useState } from "react";
import Select from 'react-select';
import { useHistory } from 'react-router-dom';
import DeckObject from './DeckObject.js';
import { IoHammer, IoEyeOutline } from 'react-icons/io5';
import { RiHeartsLine, RiSearchEyeLine } from 'react-icons/ri';
import { BsEye } from 'react-icons/bs';
import { FaRegComments } from 'react-icons/fa';
import wMana from "../../assets/images/symbols/white_mana.svg";
import uMana from "../../assets/images/symbols/blue_mana.svg";
import bMana from "../../assets/images/symbols/black_mana.svg";
import rMana from "../../assets/images/symbols/red_mana.svg";
import gMana from "../../assets/images/symbols/green_mana.svg";



function DecksBrowser() {
  const [option, setOption] = useState("");
  const [decks, setDecks] = useState([]);

  const history = useHistory();

  const optionSelect = [
    { value: "Most Discussed", label: "Most Discussed" },
    { value: "Most Liked", label: "Most Liked" },
    { value: "Most Viewed", label: "Most Viewed" },
  ];


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

  // console.log(decks);
  const deckObjects = decks.map((deck, i) => {
    return (
        <DeckObject key={i} data={deck} />
    );
  });

  const selectStyles = {
    control: styles => ({ ...styles, backgroundColor: '#21262D', borderRadius: '18px', border: '1px solid #E6CD8C', color: '#E6CD8C', }),
    singleValue: styles => ({ ...styles, color: '#46646E', }),
    dropdownIndicator: styles => ({ ...styles, color: '#46646E', }),
    menu: styles => ({ ...styles, backgroundColor: '#21262D', border: '1px solid #E6CD8C' }),
    indicatorSeparator: styles => ({ ...styles, backgroundColor: '#46646E', }),
    input: styles => ({ ...styles, textAlign: 'center' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      //const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isSelected ? '#E6CD8C' : '#21262D',
        color: '#46646E',
        cursor: isDisabled ? 'not-allowed' : 'default',
        textAlign: 'center',
      };
    },
  }

  return (
    <div className="decksbrowser">
      <div className="deckbrowser__header">
        <Select
          className="decksbrowser__select-bar"
          placeholder="Pick a Category"
          defaultValue={option}
          options={optionSelect}
          onChange={setOption}
          styles={selectStyles}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: '#E6CD8C',
              primary: '#21262D',
            },
          })}
        />
        <button title="Build" className="deckbrowser__header-button" onClick={() => history.push("/decks/build")}>
          <IoHammer />
        </button>
      </div>
      <div className="decksbrowser__deck-list">
        <div className="decksbrowser__deck-list-wrapper">
          {decks.map((deck, i) => (
            <div key={i} className="decksbrowser__deck-list-item">
              <div className="decksbrowser__deck-list-item-mana">
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
                <div style={{color: "FF6000"}}>
                  <RiHeartsLine style={{ fill: "#FF6000", margin: "0 5px"}}/>
                  {deck.total_likes}
                </div>
                <div>
                  <FaRegComments style={{ fill: "#FF6000", margin: "0 5px"}}/>
                  {deck.total_comments}
                </div>
              </div>
              <DeckObject data={deck} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DecksBrowser;
