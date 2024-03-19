import React, { useState } from 'react';
import './SearchBar.css';
import { BASE_URL } from '../../App';
import SearchShow from '../SearchShow/SearchShow'
import { useRecoilState } from 'recoil';
import { searchAtom } from '../../store/searchAtom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useRecoilState(searchAtom);
  const [searchClicked, setSearchClicked] = useState(false);
  let timeoutId;

  async function search(query) {
    try {
      const data = { query };
      const response = await fetch(`${BASE_URL}/search`, {
        method: "POST",
        headers: {
          "Content-type": 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      setSearchResult(json);
    } catch (error) {
      console.error('Error searching:', error);
    }
  }

  function handleChange(e) {
    const query = e.target.value;
    setQuery(query);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      search(query);
    }, 300); 
  }

  function handleSubmit(e) {
    e.preventDefault(); 
    setSearchClicked(true); 
  }

  return (
    <div>
      <form id="search_bar" name="search_bar" onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          name="search"
          autoFocus={false}
          value={query}
          onChange={handleChange}
          onClick={() => setSearchClicked(true)}
        />
        <button type="submit" className='search_icon'></button>
      </form>
      {searchClicked && <SearchShow result={searchResult} />} 
    </div>
  );
};

export default SearchBar;
