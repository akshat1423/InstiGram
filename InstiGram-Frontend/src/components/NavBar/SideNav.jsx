import { Link, useLocation } from "react-router-dom";
import "./SideNav.css"


function closeNav(){
    document.getElementById("mySidenav").style.width = "0";
}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function SideNav(){
    const userId = localStorage.getItem('userId');
    const location = useLocation();

    return(
        <>
        <div id="mySidenav" className="sidenav">
            {/* <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a> */}
            <h1 className="heading-instigram">Instigram</h1>
            <ul >
            <li><Link className="nav-list-item" to="/feed">
            <div className="navbar-icon-calendar" />
            Calendar</Link><br /></li>
            <li ><Link className="nav-list-item" to={`/profile/${userId}`} state={{background: location}} ><div className=" navbar-icon-profile" />Profile</Link><br /></li>
            <li ><Link className="nav-list-item" to="/chat" ><div className=" navbar-icon-searchh" />Search</Link><br /></li>
            <li><Link className="nav-newpost-button"><div className="addpost-icon"></div> New Post</Link></li>
            </ul>
        </div>

    <span className="openbtn" onClick={openNav}>&#9776; open</span>
    </> 
    );
}

export default SideNav