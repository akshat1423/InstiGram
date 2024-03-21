import React from 'react';
import './SearchShow.css';
import { Link, useLocation } from "react-router-dom";

export default function SearchShow(props) {
  const location = useLocation();

  return (
    <div className="below-search">      
      <ul className="search-res">
        {props.result.map(result => (
            
            <Link to={`/profile/${result.userId}`} state={{background: location}}>
              <li key={result.userId} className='res'>{result.data}</li>
            </Link>
        ))}
      </ul>        
    </div>
  );
}
