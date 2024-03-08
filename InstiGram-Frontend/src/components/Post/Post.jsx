import React,{ useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import {faHeart as h2} from '@fortawesome/free-solid-svg-icons';
import './Post.css'
import img from '../../assets/pic1.jpeg';

function CommentBox({ onSubmit,comments }) {
    const [comment, setComment] = useState('');
    const handleChange = (e) => {
        setComment(e.target.value); // Update the comment state as the user types
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(comment);
        setComment('');
    };

    return (
        //display prev comments
        
        <div className="comm">
        <ul className="all-comments">
            
                    {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        
        
        
        <form onSubmit={handleSubmit} name="comment" id="comment" value={comment} onChange={handleChange}>
            <input type="text" placeholder="Enter your Comment" />
            <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
        </form>
        </div>
    );
}

export default function Post() {
const [comments,setComments] =useState([]);   
const [like,setLike]=useState(false);
const [likeCount,setLikeCount]=useState(0);
const [commentCount,setCommentCount]=useState(0);
const [showCommentBox, setShowCommentBox] = useState(false);
const[showCommentIcon,setShowCommentIcon]=useState(true);
function likeClick(){
    setLike(!like);
    setLikeCount(likeCount + (like ? -1 : 1));
}

const commentClick = () => {
    setShowCommentBox(true);
    setShowCommentIcon(false);
};

const handleCommentSubmit = (comment) => {
    setComments([...comments, comment]);
    setShowCommentBox(false);
    setCommentCount(commentCount + 1);
    setShowCommentIcon(true);

};
    return (
        <div className="post">
        
            <img className="post_content" src={img} alt="hello" />
            {showCommentIcon&& <div className="bar">
                <div className="liker">
                    <div className="like_but">
                        
                        {
                            !like?
                        <FontAwesomeIcon icon={faHeart} onClick={likeClick} size="2x" />:
                        <FontAwesomeIcon icon={h2} style={{color: "#ca3a16"}} onClick={likeClick} size="2x" />}
                    
                    </div>
                    <div className="like_count">
                        {likeCount}
                        
                    </div>

                </div>
                <div className="commenter">
                    <div className="comment_but" onClick={commentClick}>
                        <FontAwesomeIcon icon={faComment} size="2x" />
                        </div>
                    <div className="comment_count">
                        {commentCount}
                    </div>
                </div>
                
        </div>}
        {showCommentBox && <CommentBox onSubmit={handleCommentSubmit} comments={comments} />}
        </div>
    )
}