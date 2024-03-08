import React, { useState, useEffect } from 'react';
import "./Feed.css"

function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    
    const mockPosts = [
      { id: 1, content: "post 1 content", imageUrl: "https://placehold.co/200" },
      { id: 2, content: "post 2 content",  imageUrl: "https://placehold.co/200"},
      { id: 3, content: "post 3 content", imageUrl: "https://placehold.co/200" },
      { id: 4, content: "post 4 content", imageUrl: "https://placehold.co/200" },
      { id: 5, content: "post 5 content", imageUrl: "https://placehold.co/200" },
      { id: 6, content: "post 6 content",imageUrl: "https://placehold.co/200" },
      { id: 7, content: "post 7 content", imageUrl: "https://placehold.co/200" },
      { id: 8, content: "post 8 content", imageUrl: "https://placehold.co/200" },
    ];


    const fetchData = () => {
      setTimeout(() => {
        setPosts(mockPosts);
      }, 100); 
    };

    fetchData();
  }, []); 

  return (
    <div className="post">
      <div className="posts-container">
        {posts.map((post, index) => (
          <div key={post.id} className={`post column${Math.floor(index/3)} ${(index) % 3 === 0 ? 'first' : (index) % 3 === 1 ? 'middle' : 'last'}`}>
            <img src={post.imageUrl} alt={`Image for post ${post.id}`} />
            {/* <p>{post.content}</p> */}
          </div>
        ))}
        
      </div>
    </div>
  );
}

export default Post;