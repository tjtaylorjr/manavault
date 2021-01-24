import React, { useState, useRef} from 'react';
import { useHistory } from "react-router-dom";

const SearchBar = () => {

  const [searchText, setSearchText] = useState("")
  const history = useHistory();
  const searchInput = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchText.toLowerCase();

    searchInput.current.value = "";
    history.push(`/search/${query}`);
  };

  return (
    <form>
      <input type="search" results="5" ref={searchInput} onChange={(e) => setSearchText(e.target.value)} placeholder="Search by users, cards, or decks"></input>
      <button onClick={handleSearch}></button>
    </form>
  )
}

export default SearchBar;
