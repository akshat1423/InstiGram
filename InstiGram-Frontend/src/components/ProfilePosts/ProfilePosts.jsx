import React, { useEffect } from 'react';
import {useRecoilValue } from 'recoil';
import {postAtom} from "../../store/postAtom.jsx"
import "./ProfilePosts.css"

function Post() {
  const posts = useRecoilValue(postAtom);





  return (
      <div className="posts-container">
      
        {posts.map((post, index) => (
          <div key={post.id} className="single-post">
            <img src={post.postImage} width="200px" height="200px" alt={`Image for post ${post.postId}`} />
          </div>
        ))}
        
      </div>

  );
}

export default Post;