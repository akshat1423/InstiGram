import React, { useState } from 'react';
import './SearchShow.css';
import { BASE_URL } from '../../App';

export default function SearchShow(props){
    <div className="below-search">
        
        <ul className="search-res">
        {props.searchResult.map(result => (
             <li key={result.userId}>${result.userName} ${result.gradYear}</li>
     ))}
     </ul>
        
    </div>
}