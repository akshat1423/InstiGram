import { Link } from "react-router-dom";
import "./SideNav.css"


function closeNav(){
    document.getElementById("mySidenav").style.width = "0";
}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function SideNav(){

    return(
        <>
        <div id="mySidenav" className="sidenav">
            {/* <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a> */}
            <h1 className="heading-instigram">Instigram</h1>
            <ul >
            <li ><Link className="list-item" to="/feed"><div className="calender-bg"></div>Calendar</Link><br /></li>
            <li ><Link className="list-item" to="/chat"  >Chats</Link><br /></li>
            <li ><Link className="list-item" to="/profile" >Profile</Link><br /></li>
            </ul>
        </div>

    <span className="openbtn" onClick={openNav}>&#9776; open</span>
    </> 
    );
}

export default SideNav