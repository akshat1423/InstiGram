import React, { useState, useEffect} from "react";
import './Post.css';
import { useRecoilState, useRecoilValue } from "recoil";
import { BASE_URL } from "../../App";
import { feedAtom } from "../../store/feedAtom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AllComments } from "../AllComments/AllComments";

// import { selectedPostId, selectedPostSelector } from "../../store/feedAtom";

function CommentBox({ onSubmit, comments }) {
    const [comment, setComment] = useState('');
    const [showAllComm,setShowAllComm]=useState(false)
    const openComments=()=>{
        setShowAllComm(true)
    }
    const closeComm=()=>{
        setShowAllComm(false)
    }
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
        <div className="c">
            <div className="comm">
                <div className="comm-head">Comments</div>
                    <ul className="all-comments">
                        {comments.map(comment => (
                            <li key={comment.commentId}><span class="cauth">{comment.commentAuth}:</span> {comment.commentContent}</li>
                        ))}
                    </ul>
            </div>
            <form onSubmit={handleSubmit} className="comment_box">
                <input type="text" placeholder="Enter your Comment" value={comment} onChange={handleChange} required className="comment_field" />
                <button type="submit" className="send-btn"></button>
            </form>
        </div>
    );
}

export default function Post(props) {

    const [posts, setPosts] = useRecoilState(feedAtom);
    const [liked,setLiked]=useState(props.isLiked);
    const [showCommentBox,setShowCommentBox]=useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
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
                credentials: "include",
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
                    credentials: "include",
                    headers: {
                    "Content-type": 'application/json',
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
            const userId = localStorage.getItem('userId');
            const postId = props.id;
            const commentContent=comment

            const data={
                commentAuth:userId,
                postId:postId,
                commentContent:commentContent
            }

            const res = await fetch(`${BASE_URL}/comment`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-type": 'application/json',
                },
                body: JSON.stringify(data),
            });

            const json = await res.json();
            if (res.status == 200) {

                fetch(`${BASE_URL}/feed`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                    "Content-type": 'application/json',
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
                    })
            } else if (res.status == 401) {
                navigate('/signin');
            }
            //post comments to api
        } catch(error) {
            console.error('Error submitting comment:', error);
        }
        finally {
            // setShowCommentBox(false);
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

                    {!props.isLiked ?
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
                    {props.comments.length} comments
                </div>
            </div>        
                
            
            {showCommentBox && <CommentBox onSubmit={handleCommentSubmit} comments={props.comments} />} 
        </div>
    );
}

