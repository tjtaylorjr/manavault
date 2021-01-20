import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const SearchBar = () => {

  const [searchText, setSearchText] = useState("")
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchText.toLowerCase();
    setSearchText("");
    history.push(`/search/${query}`);
  };

  return (
    <form>
      <input onChange={(e) => setSearchText(e.target.value)} placeholder="Search by users, cards, or decks"></input>
      <button onClick={handleSearch}></button>
    </form>
  )
}

export default SearchBar;
