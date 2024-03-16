import "./Bio.css"
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {detailsAtom} from "../../store/detailsAtom.jsx"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { followAtom } from "../../store/followAtom.jsx";
import { BASE_URL } from "../../App.jsx";
import { postAtom } from "../../store/postAtom.jsx";
import { imageAtom } from "../../store/imageAtom.jsx";


function Bio(){
    const details = useRecoilValue(detailsAtom);
    // const [follow, setFollow] = useRecoilState(followAtom);

    const setPosts = useSetRecoilState(postAtom);
    const setDP = useSetRecoilState(imageAtom);
    const setDetails = useSetRecoilState(detailsAtom);
    const { userId } = useParams();
    const [ownProfile, setOwnProfile] = useState(false);

    useEffect(() => {
      const storedUserId = localStorage.getItem('userId');
      
      if( storedUserId != userId){ 
        setOwnProfile(false);
      } else {
        setOwnProfile(true);
      }
    }, []);

    function handleClick() {
      const loggedUser = localStorage.getItem('userId');

      const data = {
        loggedUser: loggedUser,
        userId: userId,
      }

      fetch(`${BASE_URL}/follow`, {
        method: "POST",
        headers: {
          "Content-type": 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then( async function (res) {
          const json = await res.json();

          if (res.status == 200) {
            fetch(`${BASE_URL}/profile`, {
              method: "POST",
              headers: {
                "Content-type": 'application/json',
              },
              body: JSON.stringify(data),
            })
              .then(async function(res) {
                const json = await res.json();
                setDP(json.DP);
                setDetails(json.details);
                setPosts(json.posts);
              })
          }
        })
    }

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
          <button 
          type="button" 
          className={ownProfile ? 'display-none' : (details.isFollowing ? 'unfollow-button button-profile' : 'follow-button button-profile')}
          onClick={ handleClick }
          >
            {details.isFollowing ? 'Unfollow' : 'Follow'}
          </button>
          <button type="button" className={ownProfile ? 'display-none' : details.isFollowing ? "message-button button-profile" : "message-button button-profile"}>Message</button> <br />
        </div>
        </>
    )
}

export default Bio