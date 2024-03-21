import {React,useState,useEffect} from 'react'
import {useRecoilState} from 'recoil'
import { motion } from 'framer-motion';
import { followersAtom } from '../../store/followersAtom'
import SideNav from '../../components/NavBar/SideNav';
import PopupCard from '../../components/PopupCard/PopupCard';

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
const Followers = () => {
  
    const [followerData,setFollowerData]=useRecoilState(followersAtom)
    
    useEffect(() => {

        const userId = localStorage.getItem('userId');

        const data = {
            userId: userId
          
            
        }
        try{
        fetch(`${BASE_URL}/followers`, {
            method: "POST",
            credentials: "include",
            headers: {
            "Content-type": 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(async function(res) {
                const json = await res.json();
                setFollowerData(json);
            })}
            catch(error){
                console.log("Error fetching followers")
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
          
          <div className="scrollable-container">
            <div className="head">
                Followers
                <div className="follow-close-button-div" onClick={() => navigate(-1)}></div>
            </div>
          
          
          <div className="followersList">
            <ul className='l1'>
                {followerData.map(follower=>(
                    <li key={follower.userId}>{follower.userName}</li>
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

export default Followers
