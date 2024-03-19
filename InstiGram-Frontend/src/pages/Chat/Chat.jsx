import './Chat.css'
import React from "react";
import NavBar from "../../components/NavBar/SideNav.jsx"
import "bootstrap/dist/css/bootstrap.min.css";
import ChatContacts from "../../components/ChatContacts/ChatContacts.jsx"
import Convo from "../../components/Convo/Convo.jsx"

function Chat(){

    const baseURL = "backend-api-url"
    const user_id = localStorage.getItem("user_id")
    

    return(
        <div className='chat-container' >
            <NavBar></NavBar>
            
            <div className='container-main-chat'>
            
                <main className="content" style={{marginTop:"0px"}}>
                    <div className="container">
                        <h1 className='heading-chat' >
                            Messages
                        </h1>
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