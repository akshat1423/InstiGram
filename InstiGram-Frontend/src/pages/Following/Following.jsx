import {React,useEffect} from 'react'
import {useRecoilState} from 'recoil'
import { motion } from 'framer-motion';
import { followingAtom } from '../../store/followingAtom'
import SideNav from '../../components/NavBar/SideNav';
import { BASE_URL, getCookie } from "../../App";
import PopupCard from '../../components/PopupCard/PopupCard';
import './Following.css'
import { Link,useNavigate,useLocation, useParams  } from "react-router-dom";

const mainVariant = {
    initial: {
      y: '100vh',
      opacity: 0,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      y: '100vh',
    }
  }
  
  const overlayVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      delay: 0.5,
    },
    exit: {
      opacity: 0,
    }
  }
const Following = () => {
  
    const [followingData,setFollowingData]=useRecoilState(followingAtom)
    const navigate = useNavigate();
    const location = useLocation();
    let {userId} = useParams();
    useEffect(() => {

        

        const data = {
            userId: userId
          
            
        }
        try{
        fetch(`${BASE_URL}/following`, {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-type": 'application/json',
            "Cookie": `sessionid=${getCookie('sessionid')}`,
            },
            body: JSON.stringify(data),
        })
            .then(async function(res) {
                const json = await res.json();
                setFollowingData(json);
            })}
            catch(error){
                console.log(error)
            }
    }, []);
  return (
    <div>
      
      <motion.div className="followers-overlay" 
      variants={overlayVariant}
      initial='initial'
      animate='animate'
      exit='exit'
      >
        <SideNav className='followers-sidebar'></SideNav>
        <motion.div className="followers-animate-container" 
        variants={mainVariant}
        >
          <PopupCard>
          <div className="head">
              <div className="heading">Following</div>
                
                <div className="follow-close-button-div" onClick={() => navigate(-1)}></div>
            </div>
          <div className="scrollable-container">
            
          
          
          <div className="followersList">
            <ul className='l1'>
                {followingData.map(follower=>(
                  <Link to={`/profile/${follower.userId}`} state={{background: location}} className="follower">
                    <div className="profile-image-div">
                    <img src={follower.profileImage} alt="" className="profile-image" />
                    </div>
                    <li key={follower.userId}>{follower.userName}</li>
                  </Link>
                ))}
            </ul>
          </div>
          
          </div>
          </PopupCard>
        </motion.div>
      </motion.div>
      
    </div>
  )
}

export default Following
