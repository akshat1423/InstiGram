import React,{ useState,useEffect } from "react"
import Post from "../../components/Post/Post"

import './Feed.css'
import SearchBar from "../../components/SearchBar/SearchBar";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { feedAtom } from "../../store/feedAtom.jsx";

import NavBar from "../../components/NavBar/SideNav.jsx"


export default function App() {
    const posts=useRecoilValue(feedAtom);
    const setPosts=useSetRecoilState(feedAtom);
 
//fetch posts

    const handleSearch = async (query) => {
        try {
            const response = await fetch(`/api/search?q=${query}`);
            const data = await response.json();
            console.log(data); 
        } catch (error) {
            console.error('Error searching:', error);
        }
    }

    return (
        <div>
            <NavBar className="fixed" />
            <div className="scrollable-container-feed">
                <div className="header">
                    <SearchBar onSearch={handleSearch} className="fixed"/>
                </div>
                <div className="posts">
                    
                    
                    {posts.map(post => (
                        <Post key={post._id} className="post" id={post._id}/>
                    ))}
                </div>
            </div>
        </div>
    );
}