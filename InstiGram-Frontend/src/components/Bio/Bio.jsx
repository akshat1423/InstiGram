import "./Bio.css"
import { useRecoilValue } from 'recoil';
import {detailsAtom} from "../../store/detailsAtom.jsx"
import { useState, useEffect } from "react";


function Bio(){
    const details = useRecoilValue(detailsAtom)

    const [userIdStored, setUserId] = useState();

    useEffect(() => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }, []);

    var ownProfile = false;
    if( userIdStored == details.userId ) ownProfile = true;

    return(
        <>
        <div className="bada-bio">
        <div className="bio">
                    <div className="name"><p>{details.name}</p> <br /></div>
                    <div className="user-bio"><p>{details.bio}</p> </div>
        </div>
        <div className="acad-details">
            <div className="degree acad">{details.degree}</div>
            <div className="subject acad">{details.department}</div>
            <div className="grad-year acad">Class of {details.gradYear}</div>
            
        </div>
        
            
        </div>
        <div  className="profile-buttons-container">
        <button type="button" className={details.isFollowing ? 'unfollow-button button-profile' : 'follow-button button-profile'}>{details.isFollowing ? 'Unfollow' : 'Follow'}</button>
        <button type="button" className={details.isFollowing ?"message-button button-profile" : "centre-message-button message-button button-profile"}>Message</button> <br />
        </div>
        </>
    )
}

export default Bio