import React, { useState } from 'react';
import './SearchBar.css';
import { BASE_URL } from '../../App';
import SearchShow from '../SearchShow/SearchShow'
import { useRecoilState } from 'recoil';
import { searchAtom } from '../../store/searchAtom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResult,setSearchResult]=useRecoilState(searchAtom)

  function handleSubmit(e) {
    e.preventDefault();

    const query = e.target.value;

    const data = {
      query: query,
    }

    try {

        fetch(`${BASE_URL}/search`, {
            method: "POST",
            headers: {
                "Content-type": 'application/json',
            },
            body: JSON.stringify(data),
        })
          .then(async function (res) {
            const data = await response.json();
            console.log(data);
          })
    } catch (error) {
        console.error('Error searching:', error);
    }
  }

  function handleChange(e) {
    e.preventDefault();

    const query = e.target.value;

    const data = {
        query: query,
    }

  

    fetch(`${BASE_URL}/search`, {
      method: "POST",
      headers: {
        "Content-type": 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async function(res) {
        const json = await res.json();
        setSearchResult(json);
        <SearchShow result={searchResult}/>
      })
    
  }
     
  

  let timeout;

  function debouncedHandleChange(e) {

    clearTimeout(timeout);
    timeout = setTimeout(function() {
      handleChange(e);
    }, 100);
  }

  return (
    <div>
      <form id="search_bar" name="search_bar" onSubmit={(e) => handleSubmit(e)} onInput={(e) => debouncedHandleChange(e)}>
        <input
          type="text"
          id="search"
          name="search"
          autoFocus={false}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className='search_icon'></button>
      </form>
    </div>
  );
};

export default SearchBar;

