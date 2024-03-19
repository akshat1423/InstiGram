import React, { useState, useEffect} from "react";
import './AllComments.css';
import { useRecoilState, useRecoilValue } from "recoil";
import { BASE_URL } from "../../App";

export function AllComments(comments){
    <div className="allc">
    <ul className="all-comments">
        {comments.map(comment => (
            <li key={comment.commentId}><b>{comment.commentAuth}:</b> {comment.commentContent}</li>
        ))}
    </ul>
    {/* <form onSubmit={handleSubmit} className="comment_box">
        <input type="text" placeholder="Enter your Comment" value={comment} onChange={handleChange} required className="comment_field" />
        <button type="submit" className="send-btn"></button>
    </form> */}
    </div>
}