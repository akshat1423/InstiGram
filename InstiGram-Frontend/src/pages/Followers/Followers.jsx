import React from 'react'
import {useRecoilState} from 'recoil'
import { motion } from 'framer-motion';
import { followersAtom } from '../../store/followersAtom'
import { useState, useEffect } from 'react';
import SideNav from '../../components/NavBar/SideNav';
import { BASE_URL } from "../../App";

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
                console.log(error)
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
        <SideNav className='profile-sidebar'></SideNav>
        <motion.div className="profile-animate-container" 
        variants={mainVariant}
        >
          
          <div className="scrollable-container">
            <div className="head">
                Followers
            </div>
          
          
          <div className="followersList">
            <ul className='l1'>
                {followerData.map(follower=>(
                    <li key={follower.userId}>{follower.userName}</li>
                ))}
            </ul>
          </div>
          
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Followers
