import React, { useState, useEffect, useRef } from 'react';
import './SeachChatBar.css';
import { BASE_URL } from '../../App';
import SearchShowChat from '../SearchShowChat/SearchShowChat'
import { useRecoilState } from 'recoil';
//import { searchChatAtom } from '../../store/searchChatAtom.jsx';
import { searchChatAtom } from '../../store/searchChatAtom.jsx'

const SearchChatBar = () => {
  const [query, setQuery] = useState('');
  const [searchChatResult, setSearchChatResult] = useRecoilState(searchChatAtom);
  const [searchChatClicked, setSearchChatClicked] = useState(false);
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
      setSearchChatResult(json);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    const query = e.target.value;
    setQuery(query);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (query != '') {
        search(query);
      } else {
        setSearchChatResult([]);
      }
    }, 300);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSearchChatClicked(true);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setSearchChatClicked(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef}>
      <form id="search_bar_chat" name="search_bar_chat" onSubmit={handleSubmit}>
        <input
          type="text"
          id="search-chat"
          name="search-chat"
          autoFocus={false}
          autoComplete="off"
          value={query}
          onChange={handleChange}
          onClick={() => setSearchChatClicked(true)}
        />
        <button type="submit" className='search_icon'></button>
      </form>
      {searchChatClicked && <SearchShowChat result={searchChatResult} />}
    </div>
  );
};

export default SearchChatBar;

