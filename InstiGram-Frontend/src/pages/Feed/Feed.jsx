import React,{ useState,useEffect } from "react"
import Post from "../../components/Post/Post"

import './Feed.css'
import SearchBar from "../../components/SearchBar/SearchBar";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { feedAtom } from "../../store/feedAtom.jsx";

import NavBar from "../../components/NavBar/SideNav.jsx"
import {loadingAtom} from "../../store/loadingAtom.jsx"
import {errorAtom} from "../../store/errorAtom.jsx"


export default function App() {


    
    const posts=useRecoilValue(feedAtom);

    
    const setLoading = useSetRecoilState(loadingAtom);

    
    const setError = useSetRecoilState(errorAtom);



    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch("http://localhost:8080/api/v1/social-media/posts?page=1&limit=10");
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data.posts);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleSearch = async (query) => {
        try {
            const response = await fetch(`/api/search?q=${query}`);
            const data = await response.json();
            console.log(data); 
        } catch (error) {
            console.error('Error searching:', error);
        }
    };

    return (
        <div>
            <NavBar className="fixed" />
            <div className="header">
                <SearchBar onSearch={handleSearch} className="fixed"/>
            </div>
            <div className="posts">
                <Post key={1} postAuth={"Gaurav Kumar"} className="post" postId={1} postImg={"../../assets/pic1.jpeg"}  />
                <Post key={2} postAuth={"Paul Atriedes"} className="post" postId={2} postImg={"../../assets/pic1.jpeg"}  />
                <Post key={3} postAuth={"Paul Atriedes"} className="post" postId={3} postImg={"../../assets/pic1.jpeg"}  />
                {posts.map(post => (
                    <Post key={post.id} postAuth={post.auth} className="post" postId={post._id} postImg={post.url} postContent={post.content} />
                ))}
            </div>
        </div>
    );
}