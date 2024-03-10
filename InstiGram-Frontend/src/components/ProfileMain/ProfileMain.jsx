import "./ProfileMain.css"
 import Post from "../ProfilePosts/ProfilePosts.jsx";
 import Details from "../Details/Details.jsx";
 import Pic from "../ProfilePic/Pic.jsx";
 import Bio from "../Bio/Bio.jsx";


function ProfileMain(){

return(
<div className="big-container">  
    <div className="container">
        <div className="details-1">
            <Pic></Pic>
            <Details></Details>
        </div>
    
    </div>
    <Bio></Bio>
    <Post></Post>
    
</div>
    );
}

export default ProfileMain