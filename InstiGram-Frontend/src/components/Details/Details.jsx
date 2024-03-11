import React, { useState, useEffect } from 'react';
import "./Details.css"
import {useRecoilState, useRecoilValue } from 'recoil';
import {detailsAtom} from "../../store/detailsAtom.jsx"
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Details(){

    const details = useRecoilValue(detailsAtom);
    const navigate = useNavigate();
    let location = useLocation();



    return(<>
            <div className="daughter-2">
                <div className="head">
                    <h2 className="username">{details.username}</h2>
                    <Link to='/profile/edit' state={{background: location}} >Edit Profile</Link>
                    <div className="profile-close-button-div" onClick={() => navigate(-1)}></div>
                    <br></br>
                    <button type="button" className={details.isFollowing ? 'unfollow-button button-profile' : 'follow-button button-profile'}>{details.isFollowing ? 'Unfollow' : 'Follow'}</button>
                    <button type="button" className="message-button button-profile">Message</button> <br />
                </div>

                <div className="list"><ul>
                    <li className='show-posts'> {details.posts} <br /> <p className='key-details'> Posts </p></li>
                    <li className='show-followers' > {details.followers} <br /> <p className='key-details'>Followers</p> </li>
                    <li className="show-following"> {details.following} <br /><p className='key-details' >Posts</p></li>
                </ul>
                </div>
                </div>
                
            </>
    );

}

export default Details