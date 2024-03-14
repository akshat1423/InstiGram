import React, { useState, useEffect} from "react";
import './Post.css';
import { useRecoilState, useRecoilValue } from "recoil";
import { BASE_URL } from "../../App";
import { feedAtom } from "../../store/feedAtom";
import { Link, useLocation } from "react-router-dom";
// import { selectedPostId, selectedPostSelector } from "../../store/feedAtom";

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
                {comments.map((comment) => (
                    <li key={comment.commentId}><b>{comment.commentAuth}:</b> {comment.commentContent}</li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className="comment_box">
                <input type="text" placeholder="Enter your Comment" value={comment} onChange={handleChange} required className="comment_field" />
                <button type="submit" className="send-btn"></button>
            </form>
        </div>
    );
}

export default function Post(props) {
    // const post=useRecoilValue(feedAtom)
    //how to implement a post with specific post id
    const [posts, setPosts] = useRecoilState(feedAtom);
    const [liked,setLiked]=useState(props.isLiked);
    const location = useLocation();

    const likeClick = async () => {
        try {

            const userId = localStorage.getItem('userId');
            const postId = props.id;

            const data = {
                userId: userId,
                liked: !liked,
                postId: postId,
            }

            //post likes to api
            const res = await fetch(`${BASE_URL}/liked`, {
                method: "POST",
                headers: {
                    "Content-type": 'application/json',
                },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (res.status == 200) {
                setLiked(!liked);

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
            }

        } catch (error) {
            console.error('Error liking:', error);
        }
    };

    const commentClick = () => {
        setShowCommentBox(true);
    };

    const handleCommentSubmit = async (comment) => {
        try {
            //post comments to api
        } catch(error) {
            console.error('Error submitting comment:', error);
        }
        finally {
            setShowCommentBox(false);
        }
    };

    return (
        <div className="post">
            <div className="post_det">
                <div className="post-profile-image-div">
                    <img src={props.profileImage} alt="" className="post-profile-image" />
                </div>
                <Link to={`/profile/${props.authId}`} state={{background: location}} className="post_auth">
                    {props.auth}
                </Link>
            </div>
            <div className="post_content">
                <img src={props.image} className="post-image" />
                <div className="post-caption">
                    {props.caption}
                </div>
            </div>
            
            
            <div className="bar">

                    {!liked ?
                        <div className="notLiked" onClick={likeClick}> </div>:
                        <div className="liked" onClick={likeClick}></div>
                    } 
                
                <div className="comment_but" onClick={commentClick}>
                    
                </div>
                <div className="share_but">
                    
                </div>
            </div>
            <div className="below_post">
                    <div className="like_count">

                    {props.likes} likes
                
                </div>
            
                
                <div className="comment_count">
                    {props.comments} comments
                </div>
            </div>        
                
            
             {showCommentBox && <CommentBox onSubmit={handleCommentSubmit} comments={props.comments} />} 
        </div>
    );
}

