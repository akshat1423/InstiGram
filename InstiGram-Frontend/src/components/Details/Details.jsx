import React, { useState, useEffect } from 'react';
import "./Details.css"
import {useRecoilState, useRecoilValue } from 'recoil';
import {detailsAtom} from "../../store/detailsAtom.jsx"
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Details(){

    const details = useRecoilValue(detailsAtom);
    const navigate = useNavigate();
    let location = useLocation();

    const [userIdStored, setUserId] = useState();

    useEffect(() => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }, []);

    var ownProfile = false;
    if( userIdStored == details.userId ) ownProfile = true;




    return(<>
            <div className="daughter-2">
                <div className="head">
                    <h2 className="username">{details.username}</h2>
                    <Link to='/profile/edit' className={ownProfile ? 'edit-profile-button' : 'display-none'} state={{background: location}} >Edit Profile</Link>
                    <div className="profile-close-button-div" onClick={() => navigate(-1)}></div>
                    <br></br>
                    
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