import React, { useState, useEffect} from "react";
import './Post.css';
import { useRecoilState,useRecoilValue } from "recoil";
import { feedAtom } from "../../store/feedAtom";




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
                    <li>{comment.commentAuth}: {comment.commentContent}</li>
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
    // const post=useRecoilValue(feedAtom)
    //how to implement a post with specific post id
    const [liked,setLiked]=useState(false)
    const likeClick = async () => {
    try {
        setLiked(!liked);
        //post likes to api
    } catch (error) {
        console.error('Error liking:', error);
    }
};


    const commentClick = () => {
        setShowCommentBox(true);
        setShowCommentIcon(false);
    };

    const handleCommentSubmit = async (comment) => {
        try{
            //post comments to api
            

        } catch(error) {
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
                <div className="post-profile-image-div">
                    <img src={props.image} alt="" className="post-profile-image" />
                </div>
                <div className="post_auth">{props.auth}
            </div>
            </div>
            <div className="post_content"></div>
            
            
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
                    
                
            
            {/* {showCommentBox && <CommentBox onSubmit={handleCommentSubmit} comments={post.comments} />} */}
        </div>
    );
}
