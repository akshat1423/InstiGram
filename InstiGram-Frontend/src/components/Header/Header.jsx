
import SideNav from "../NavBar/SideNav";
import "./Header.css"
import Pic from "../ProfilePic/Pic"
import Details from "../Details/Details";

function Header(){

    return(
        <>
            <SideNav />  
            <div className="container">
                <Pic />
                <Details />
            </div>
        </>

    );
}

export default Header;