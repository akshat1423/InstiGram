import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';/
// import { faHeart as h2 } from '@fortawesome/free-solid-svg-icons';
import './Post.css';

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
                <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
            </form>
        </div>
    );
}

export default function Post(props) {
    const [comments, setComments] = useState([]);
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState();
    const [commentCount, setCommentCount] = useState();
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [showCommentIcon, setShowCommentIcon] = useState(true);



    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/social-media/comments/post/{props.postId}`);
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
            const response = await fetch(`http://localhost:8080/api/v1/social-media/like/post/{props.postId}`);
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
            <img className="post_content" src={props.postImg} alt="hello" />
            <p>{props.postContent}</p>
            {showCommentIcon && (
                <div className="bar">
                    <div className="liker">
                        <div className="like_but">
                            {/* {!like ?
                                <FontAwesomeIcon icon={faHeart} onClick={likeClick} size="2x" /> :
                                <FontAwesomeIcon icon={h2} style={{ color: "#ca3a16" }} onClick={likeClick} size="2x" />
                            } */}
                        </div>
                        <div className="like_count">
                            {likeCount}
                        </div>
                    </div>
                    <div className="commenter">
                        <div className="comment_but" onClick={commentClick}>
                            {/* <FontAwesomeIcon icon={faComment} size="2x" /> */}
                        </div>
                        <div className="comment_count">
                            {commentCount}
                        </div>
                    </div>
                </div>
            )}
            {showCommentBox && <CommentBox onSubmit={handleCommentSubmit} comments={comments} />}
        </div>
    );
}
