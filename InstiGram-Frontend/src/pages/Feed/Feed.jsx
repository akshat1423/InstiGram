import React,{ useState,useEffect } from "react"
import Post from "../../components/Post/Post"

import './Feed.css'
import SearchBar from "../../components/SearchBar/SearchBar";
<<<<<<< HEAD
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { postAtom } from "../../store/postAtom.jsx";
=======
import SideNav from "../../components/NavBar/SideNav";
>>>>>>> 86a379e5ae65d78c6221768d960c9d0cd4c9935f

import NavBar from "../../components/NavBar/SideNav.jsx"
import {loadingAtom} from "../../store/loadingAtom.jsx"
import {errorAtom} from "../../store/errorAtom.jsx"


export default function App() {
  

    
    const posts=useRecoilValue(postAtom);

    
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
<<<<<<< HEAD
            <NavBar />
           
            <SearchBar onSearch={handleSearch} />
=======
            <SideNav></SideNav>
            <div className="header">
                <SearchBar onSearch={handleSearch} />
                <DarkModeSwitch darkMode={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </div>
>>>>>>> 86a379e5ae65d78c6221768d960c9d0cd4c9935f
            <div className="posts">
            <Post key={1} darkMode={darkMode} className="post" postId={1} postImg={"../../assets/pic1.jpeg"} postContent={"hi"} />
    {posts.map(post => (
        <Post key={post.id} darkMode={darkMode} className="post" postId={post._id} postImg={post.url} postContent={post.content} />
    ))}
</div>
        </div>
    );
}