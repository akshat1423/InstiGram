import React, { useState } from 'react';
import './SearchBar.css';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    onSearch(query);
  };

  return (
    <div>
      <form id="search_bar" name="search_bar" onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for a user..."
          autoFocus={true}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      </form>
    </div>
  );
};

export default SearchBar;

