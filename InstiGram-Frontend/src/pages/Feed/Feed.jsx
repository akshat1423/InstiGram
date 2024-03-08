import React,{ useState,useEffect } from "react"
import Post from "../../components/Post/Post"
import DarkModeSwitch from "../../components/DarkModeSwitch/DarkModeSwitch";
import './Feed.css'
import SearchBar from "../../components/SearchBar/SearchBar";

import { Link } from "react-router-dom";

export default function App(){
    const [darkMode,setDarkMode] = useState(false);

    useEffect(() => {
      document.body.classList.toggle('darkMode', darkMode);
    },[darkMode])
  
    useEffect(() => {
      fetch("server-name")
        .then(async function(res) {
          const json = await res.json();
          //userCount = json.userCount;
        })
    },[])
    //search api request
    const handleSearch = async (query) => {
      try {
        const response = await fetch(`/api/search?q=${query}`);
        const data = await response.json();
        console.log(data); 
      } catch (error) {
        console.error('Error searching:', error);
      }
    };


    return(
      <div>
        <div className="header">
        <SearchBar onSearch={handleSearch} />
        <Link to="/profile" >Profile</Link>
        <DarkModeSwitch darkMode={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>
        <div className="posts">
        <Post darkMode={darkMode} className="post"/>
        <Post darkMode={darkMode} className="post"/>
        </div>
       
      </div>
    )
}

