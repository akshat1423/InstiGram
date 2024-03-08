import Header from "../../components/Header/Header.jsx";
import Post from "../../components/ProfilePosts/ProfilePosts.jsx";
import "./Profile.css"
import SideNav from "../../components/NavBar/SideNav.jsx";
import Details from "../../components/Details/Details.jsx";
import Pic from "../../components/ProfilePic/Pic.jsx";
import React, { useEffect } from 'react';
import { useSetRecoilState } from "recoil";
import { postAtom } from "../../store/postAtom.jsx";
import { imageAtom } from "../../store/imageAtom.jsx";
import { detailsAtom } from "../../store/detailsAtom.jsx";


function Profile() {
  const setPosts = useSetRecoilState(postAtom);
  const setDP = useSetRecoilState(imageAtom);
  const setDetails = useSetRecoilState(detailsAtom);

  useEffect(() => {
    
    // const userId = localStorage.getItem(userId);

    const data = {
      userId: 5,
    }

    console.log(data);
    console.log(JSON.stringify(data));
    fetch("http://127.0.0.1:8000/profile", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        })
      .then(response => response.json())
        .then(data => {
          console.log(data);
          setPosts(data.posts);
          setDP(data.DP);
          setDetails(data.details)
          

    })
    
  }, []);

  return(
    <>
    {/* <Header></Header> */}
    <SideNav></SideNav>
    <div className="bada-container">
    <div className="container">
    <Pic></Pic>
    <Details></Details>
    </div>
    {/* <Post></Post> */}
    </div>
    
    </>
  );
}

export default Profile
