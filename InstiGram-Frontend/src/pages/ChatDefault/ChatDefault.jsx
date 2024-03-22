import './ChatDefault.css'
import React, { useEffect } from "react";
import NavBar from "../../components/NavBar/SideNav.jsx"
import "bootstrap/dist/css/bootstrap.min.css";
import ChatContacts from "../../components/ChatContacts/ChatContacts.jsx"
import { BASE_URL } from '../../App.jsx';
import { useNavigate } from 'react-router-dom';


function ChatDefault(){
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/cookie`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
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
        <div className='chat-default-container' >
            <NavBar></NavBar>
            
            <div className='container-main-chat-default'>
            
                <main className="content" >
                    <div className="container-default">
                        <h1 className='heading-chat-default' >
                            Messages
                        </h1>
                            <div className="card1-default row">
                                <ChatContacts></ChatContacts>


                            </div>
                    </div>
 
                </main>
            </div>

        </div>
    )

}

export default ChatDefault;