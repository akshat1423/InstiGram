import { Link, useLocation } from "react-router-dom";
import "./SideNav.css"
import { useRecoilValue } from "recoil";
import { calendarAtom, createAtom, profileAtom } from "../../store/pageAtoms";



function closeNav(){
    document.getElementById("mySidenav").style.width = "0";
}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function SideNav(){
    const userId = localStorage.getItem('userId');
    const profile = useRecoilValue(profileAtom);
    const calendar = useRecoilValue(calendarAtom);
    const create = useRecoilValue(createAtom);
    const location = useLocation();

    return(
        <>
        <div id="mySidenav" className="sidenav">
            {/* <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a> */}
            <h1 className="heading-instigram">Instigram</h1>
            <ul >
                <li className={calendar ? " calendar-open" : ""} >
                    {!calendar ? <Link className="nav-list-item " to='/calendar'>
                        <div className="navbar-icon-calendar" />
                            Calendar
                    </Link> :
                    <div className="nav-list-item">
                        <div className="navbar-icon-calendar" />
                            Calendar
                    </div>}
                    <br />
                    </li>
                <li className={profile ? " profile-open" : ""} >
                    {!profile ? <Link className="nav-list-item" to={`/profile/${userId}`} state={{background: location}} >
                    <div className={" navbar-icon-profile"} />
                    Profile
                    </Link> : 
                    <div className="nav-list-item">
                        <div className="navbar-icon-profile" />
                        Profile
                    </div>}
                    <br />
                </li>
                <li >
                    <Link className="nav-list-item" to="/chat" >
                        <div className=" navbar-icon-search" />
                        Search
                    </Link>
                    <br />
                </li>
                <li>
                    {!create ? <Link className="nav-newpost-button" to='/post/create' state={{background: location}} >
                        <div className="addpost-icon"></div> 
                        New Post
                    </Link> : 
                    <div className={"nav-newpost-button create-open"}>
                        <div className="addpost-icon-open" />
                        New Post
                    </div>}
                </li>
            </ul>
        </div>

    <span className="openbtn" onClick={openNav}>&#9776; open</span>
    </> 
    );
}

export default SideNav