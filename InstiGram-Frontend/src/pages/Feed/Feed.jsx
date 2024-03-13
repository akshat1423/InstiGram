import React,{ useState,useEffect } from "react"
import Post from "../../components/Post/Post"

import './Feed.css'
import SearchBar from "../../components/SearchBar/SearchBar";
import {  useRecoilState } from "recoil";
import { feedAtom } from "../../store/feedAtom.jsx";

import NavBar from "../../components/NavBar/SideNav.jsx"
import { BASE_URL } from "../../App.jsx";


export default function App() {
    const [posts, setPosts] = useRecoilState(feedAtom);


    useEffect(() => {

        const userId = localStorage.getItem('userId');

        const data = {
            userId: userId
        }
    
        fetch(`${BASE_URL}/feed`, {
            method: "POST",
            headers: {
            "Content-type": 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(async function(res) {
                const json = await res.json();
                setPosts(json);
            })
    }, []);

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
                        <Post 
                            key={posts.indexOf(post)} 
                            id={post._id} 
                            auth={post.auth} 
                            profileImage={post.profileImage}
                            image={post.postImage}
                            likes={post.likes} 
                            comments={post.comments}
                            isLiked={post.isLiked}
                            caption={post.caption}
                            className="post" />
                    ))}
                </div>
            </div>
        </div>
    );
}