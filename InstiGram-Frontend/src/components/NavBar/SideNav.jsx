import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SideNav.css"
import { useRecoilValue } from "recoil";
import { calendarAtom, createAtom, profileAtom } from "../../store/pageAtoms";
import { BASE_URL } from "../../App";



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
    const navigate = useNavigate();

    function handleLogout() {
        
        const data = {
            userId: userId,
        }

        fetch(`${BASE_URL}/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then( async function(res) {
                const json = await res.json();

                if (res.status == 200) {
                    navigate('/signin');
                }
            })
    }

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
                    <div className="nav-list-item" onClick={ handleLogout }>
                        <div className=" navbar-icon-logout" />
                        Logout
                    </div>
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