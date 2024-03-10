

import SideNav from "../../components/NavBar/SideNav.jsx";

import ProfileMain from "../../components/ProfileMain/ProfileMain.jsx"
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { postAtom } from "../../store/postAtom.jsx";
import { imageAtom } from "../../store/imageAtom.jsx";
import { detailsAtom } from "../../store/detailsAtom.jsx";


function Profile() {
  const setPosts = useSetRecoilState(postAtom);
  const setDP = useSetRecoilState(imageAtom);
  const setDetails = useSetRecoilState(detailsAtom);
  const { userId } = useParams();
  const navigate = useNavigate();

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

  return(
    <>
    
    <SideNav></SideNav>
    <ProfileMain ></ProfileMain>
    
    </>
  );
}

export default Profile