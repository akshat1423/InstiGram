import React from 'react';
import './SeachShowChat.css';
import { Link, useLocation } from "react-router-dom";

export default function SearchShowChat(props) {
  const location = useLocation();

  return (
    <div className="below-search">      
      <ul className="search-res">
        {props.result.map(result => (
            <Link to={`/chat/${result.userId}`} state={{background: location}}>
              <li key={result.userId} className='res'>{result.userName}</li>
            </Link>
        ))}
      </ul>        
    </div>
  );
}
