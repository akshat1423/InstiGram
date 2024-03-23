import React,{ useState,useEffect } from "react"
import Post from "../../components/Post/Post"

import './Feed.css'
import SearchBar from "../../components/SearchBar/SearchBar";
import {  useRecoilState } from "recoil";
import { feedAtom } from "../../store/feedAtom.jsx";

import NavBar from "../../components/NavBar/SideNav.jsx"
import { BASE_URL } from "../../App.jsx";
import { useNavigate } from "react-router-dom";

export default function App() {
    const navigate = useNavigate();
    const [posts, setPosts] = useRecoilState(feedAtom);


    useEffect(() => {

        const userId = localStorage.getItem('userId');

        const data = {
            userId: userId
        }
    
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            console.log(name,parts)
            console.log(parts.pop().split(';').shift());
        }
        
        const csrfToken = getCookie('csrftoken');
        const sessionId = getCookie('sessionid');
        
        fetch(`${BASE_URL}/feed`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": 'application/json',
                "Cookie": `sessionid=${getCookie('sessionid')}`,
            },
            body: JSON.stringify(data),
        })
        .then(async function(res) {
            const json = await res.json();
            if (res.status == 200) {
                setPosts(json);
            } else if (res.status == 401) {
                navigate('/signin');
            }
        });
    }, []);        


    return (
        <div>
            <NavBar className="fixed" />
            <div className="scrollable-container-feed">
                <div className="header">
                    <SearchBar className="fixed" />
                </div>
                <div className="posts">
                    
                    
                    {posts.map(post => (
                        <Post 
                            key={posts.indexOf(post)} 
                            id={post._id} 
                            auth={post.auth} 
                            authId={post.authId}
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