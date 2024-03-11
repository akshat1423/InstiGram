

import SideNav from "../../components/NavBar/SideNav.jsx";

import ProfileMain from "../../components/ProfileMain/ProfileMain.jsx"
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { postAtom } from "../../store/postAtom.jsx";
import { imageAtom } from "../../store/imageAtom.jsx";
import { detailsAtom } from "../../store/detailsAtom.jsx";

import { motion } from 'framer-motion';

import './Profile.css';

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

function Profile() {
  const setPosts = useSetRecoilState(postAtom);
  const setDP = useSetRecoilState(imageAtom);
  const setDetails = useSetRecoilState(detailsAtom);
  const { userId } = useParams();

  useEffect(() => {
    
    const loggedUser = JSON.parse(localStorage.getItem('userId'));

    const data = {
      userId: userId,
      loggedUser: loggedUser,
    }

    console.log(data);
    // console.log(JSON.stringify(data));

    fetch(`http://localhost:8000/profile`, {
      method: "POST",
      headers: {
        "Content-type": 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async function(res) {
        const json = await res.json();
        setDP(json.DP)
        setDetails(json.details)
        setPosts(json.posts)

      })
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'scroll';
    }
  })

  return(
    <>
      <motion.div className="overlay" 
      variants={overlayVariant}
      initial='initial'
      animate='animate'
      exit='exit'
      >
        <SideNav></SideNav>
        <motion.div className="profile-animate-container" 
        variants={mainVariant}
        >
          <ProfileMain ></ProfileMain>
        </motion.div>
      </motion.div>
    </>
  );
}

export default Profile