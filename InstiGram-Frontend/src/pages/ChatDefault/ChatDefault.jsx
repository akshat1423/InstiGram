 import './ChatDefault.css'
import React from "react";
import NavBar from "../../components/NavBar/SideNav.jsx"
import "bootstrap/dist/css/bootstrap.min.css";
import ChatContacts from "../../components/ChatContacts/ChatContacts.jsx"


function ChatDefault(){
    

    return(
        <div className='chat-default-container' >
            <NavBar></NavBar>
            
            <div className='container-main-chat-default'>
            
                <main className="content" style={{marginTop:"0px"}}>
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