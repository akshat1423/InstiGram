import React from 'react';
import './SearchShow.css';
import { Link, useLocation } from "react-router-dom";

export default function SearchShow(props) {
  return (
    <div className="below-search">      
      <ul className="search-res">
        {props.result.map(result => (
            <Link to={`/profile/${result.userId}`} state={{background: location}} className="res">
            <li key={result.userId}>{result.userName} {result.gradYear}</li>
            </Link>
        ))}
      </ul>        
    </div>
  );
}
