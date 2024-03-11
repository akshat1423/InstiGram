import React, { useState } from 'react';
import './SearchBar.css';


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
          autoFocus={false}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className='search_icon'></button>
      </form>
    </div>
  );
};

export default SearchBar;

