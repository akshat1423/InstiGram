import React from 'react'
import {useRecoilState} from 'recoil'
import { motion } from 'framer-motion';
import { followeringAtom } from '../../store/foloweringAtom'

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
const Follow = () => {
    const [page,setPage]=useState(true) //true for followers, false for following
    const [followData,setFollowData]=useRecoilState(followeringAtom)
    function clickFunc(){
        setPage(!page)
    }
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
                setFollowData(json);
            })}
            catch(error){
                console.log("Error fetching followers")
            }
    }, []);
  return (
    <div>
      <motion.div className="profile-overlay" 
      variants={overlayVariant}
      initial='initial'
      animate='animate'
      exit='exit'
      >
        <motion.div className="profile-animate-container" 
        variants={mainVariant}
        >
          <div className="scrollable-container">
            <div className="head">
                {page?<div className="f1">
                <div className="followers sp" onClick={clickFunc}>
                    Followers
                </div>
                <div className="following" onClick={clickFunc}>
                    Following
                </div>
                </div> :
                <div className="f2">
                <div className="followers" onClick={clickFunc}>
                    Followers
                </div>
                <div className="following sp" onClick={clickFunc}>
                    Following
                </div>
                </div>}
            </div>
          
          {page?
          <div className="folowersList">
            <ul className='l1'>
                {followData.followers.map(follower=>(
                    <li key={follower.userId}>{follower.userName}</li>
                ))}
            </ul>
          </div>:
          <div className="followingList">
          <ul className='l1'>
                {followData.following.map(follower=>(
                    <li key={follower.userId}>{follower.userName}</li>
                ))}
            </ul>
          </div>}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Follow
