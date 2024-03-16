import "./ProfileMain.css"
import Post from "../ProfilePosts/ProfilePosts.jsx";
import Details from "../Details/Details.jsx";
import Pic from "../ProfilePic/Pic.jsx";
import Bio from "../Bio/Bio.jsx";
import PopupCard from "../PopupCard/PopupCard.jsx"
import { useNavigate } from "react-router-dom";

function ProfileMain(){
    const navigate = useNavigate();

return(
    <div className="outer-container">
        <PopupCard>  
            
            <div className="container">
                <div className="details-1">
                    <Pic></Pic>
                    <Details></Details>
                    <div className="profile-close-button-div" onClick={() => navigate(-1)}></div>

                </div>
            
            </div>
            <Bio></Bio>
            <Post></Post>
            
        </PopupCard>
    </div>
    );
}

export default ProfileMain