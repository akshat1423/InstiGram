import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';
import { BASE_URL } from '../../App';
import SearchShow from '../SearchShow/SearchShow'
import { useRecoilState } from 'recoil';
import { searchAtom } from '../../store/searchAtom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useRecoilState(searchAtom);
  const [searchClicked, setSearchClicked] = useState(false);
  const searchBarRef = useRef(null);
  let timeoutId;

  async function search(query) {
    try {
      const data = { query };
      const response = await fetch(`${BASE_URL}/search`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      setSearchResult(json);
    } catch (error) {
      console.error(error);
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

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setSearchClicked(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef}>
      <form id="search_bar" name="search_bar" onSubmit={handleSubmit}>
        <input
          type="text"
          id="search"
          name="search"
          autoFocus={false}
          autoComplete="off"
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

