import './Chat.css'
import React, { useEffect } from "react";
import NavBar from "../../components/NavBar/SideNav.jsx"
import "bootstrap/dist/css/bootstrap.min.css";
import ChatContacts from "../../components/ChatContacts/ChatContacts.jsx"
import Convo from "../../components/Convo/Convo.jsx"
import { useNavigate } from 'react-router-dom';
import { BASE_URL, getCookie } from '../../App.jsx';

function Chat(){
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/cookie`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
                "Cookie": `sessionid=${getCookie('sessionid')}`
            },
        })
            .then(async function(res) {
                const status = res.status;
                const json = await res.json();

                if (status == 401) {
                    navigate('/signin')
                }
            })
    },[])

    return(
        <div className='chat-container' >
            <NavBar></NavBar>
            
            <div className='container-main-chat'>
            
                <main className="content" style={{marginTop:"0px"}}>
                    <div className="container-extra">
                        <span>
                        <h1 className='heading-chat' >
                            Messages
                        </h1></span>
                            <div className="card1 row">
                                <ChatContacts></ChatContacts>
                                <Convo />


                            </div>
                    </div>
 
                </main>
            </div>

        </div>
    )

}

export default Chat;