import React, { useState, useEffect } from "react";

import './Post.css';
import { useRecoilState } from "recoil";
import {commentAtom,likeAtom,commentCountAtom,likeCountAtom,showCommentBoxAtom,showCommentIconAtom} from '../../store/likeCommentAtom.jsx';

function CommentBox({ onSubmit, comments }) {
    const [comment, setComment] = useState('');

    const handleChange = (e) => {
        setComment(e.target.value); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.trim() !== '') {
            try {
                await onSubmit(comment);
                setComment('');
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        }
    };

    return (
        <div className="comm">
            <ul className="all-comments">
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your Comment" value={comment} onChange={handleChange} required/>
                <button type="submit" class="send-btn"></button>
            </form>
        </div>
    );
}

export default function Post(props) {
    const [comments,setComments]=useRecoilState(commentAtom)
    const [like,setLike]=useRecoilState(likeAtom)
    const [likeCount,setLikeCount]=useRecoilState(likeCountAtom)
    const [commentCount,setCommentCount]=useRecoilState(commentCountAtom)
    const [showCommentBox,setShowCommentBox]=useRecoilState(showCommentBoxAtom)
    const [showCommentIcon,setShowCommentIcon]=useRecoilState(showCommentIconAtom)




    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/social-media/comments/post/${props.postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();
            setComments(data.comments); 
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    
    const fetchLikeCount = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/social-media/like/post/${props.postId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch like count');
            }
            const data = await response.json();
            setLikeCount(data.likeCount);
        } catch (error) {
            console.error('Error fetching like count:', error);
        }
    };
    useEffect(() => {
        fetchComments(); 
        fetchLikeCount();
    }, []);
    
    const likeClick = async () => {
    try {
        const newLikeState = !like;
        setLike(newLikeState);
        setLikeCount(newLikeState ? likeCount + 1 : likeCount - 1);

    } catch (error) {
        console.error('Error updating like count:', error);
    }
};


    const commentClick = () => {
        setShowCommentBox(true);
        setShowCommentIcon(false);
    };

    const handleCommentSubmit = async (comment) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/social-media/comments/post/{props.postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }
            const newComment = await response.json();
            setComments([...comments, newComment.comment]);
            setCommentCount(commentCount + 1);

        } catch (error) {
            console.error('Error submitting comment:', error);
        }
        finally{
            setShowCommentBox(false);
            setShowCommentIcon(true);
        }
    };

    return (
        <div className="post">
            
            <div className="post_det">
                <div className="post_auth">{props.postAuth}
                </div>
            </div>
            <div className="post_content"></div>
            
            
                <div className="bar">
                   
                        
                             {!like ?
                                <div className="not-liked" onClick={likeClick}> </div>:
                                <div className="liked" onClick={likeClick}></div>
                            } 
                        
                        <div className="comment_but" onClick={commentClick}>
                            
                        </div>
                        <div className="share_but">
                            
                        </div>
                </div>
                <div className="below_post">
                        <div className="like_count">

                            {likeCount} likes
                        
                        </div>
                    
                        
                        <div className="comment_count">
                            {commentCount} comments
                        </div>
                </div>        
                    
                
            
            {showCommentBox && <CommentBox onSubmit={handleCommentSubmit} comments={comments} />}
        </div>
    );
}
