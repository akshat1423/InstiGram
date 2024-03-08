import React, { useState, useEffect } from 'react';
import "./Details.css"
import {useRecoilState, useRecoilValue } from 'recoil';
import {detailsAtom} from "../../store/detailsAtom.jsx"

function Details(){

    const details = useRecoilValue(detailsAtom);

 


    return(
        <div className="daughter-2">
                <div className="head">
                <h2 className="username">{details.username}</h2>
                <br></br>
                <button type="button" className={details.isFollowing ? 'unfollow-button' : 'follow-button'}>{details.isFollowing ? 'Unfollow' : 'Follow'}</button>
                <button type="button" className="message-button">Message</button>
                </div>

                <div className="list"><ul>
                    <li className='show-posts'>Posts <br /> {details.posts} </li>
                    <li className='show-followers' >Followers <br /> {details.followers} </li>
                    <li className="show-following">Following <br /> {details.following} </li>
                </ul>
                </div>
                <div className="bio">
                    <b className="name">{details.name} </b>
                    <p>{details.bio} </p>
                </div>
            </div>
    );

}

export default Details