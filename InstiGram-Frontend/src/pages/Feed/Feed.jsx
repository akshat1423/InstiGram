import React,{ useState,useEffect } from "react"
import Post from "../../components/Post/Post"
import DarkModeSwitch from "../../components/DarkModeSwitch/DarkModeSwitch";
import './Feed.css'
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";



export default function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        document.body.classList.toggle('darkMode', darkMode);
    }, [darkMode]);

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
            <div className="header">
                <SearchBar onSearch={handleSearch} />
                <Link to={`/profile/${userId}`}>Profile</Link>
                <DarkModeSwitch darkMode={darkMode} onChange={() => setDarkMode(!darkMode)} />
            </div>
            <div className="posts">
    {posts && posts.map(post => (
        <Post key={post.id} darkMode={darkMode} className="post" postId={post._id} postImg={post.url} postContent={post.content} />
    ))}
</div>
        </div>
    );
}


