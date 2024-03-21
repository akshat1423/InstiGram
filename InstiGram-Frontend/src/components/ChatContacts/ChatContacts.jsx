import "./ChatContacts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../App";
import { useParams } from "react-router-dom";
import SearchChatBar from "../SearchChatBar/SearchChatBar";

function ChatContacts() {

    const user_id = localStorage.getItem("userId");
    console.log(user_id);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(BASE_URL + '/messages/' + user_id+ '/', {
                    method: "GET",
                    credentials: "include",
                    // headers: {},
                    // body: {}
                });
                const result = await response.json();
                console.log(result);
                if (Array.isArray(result)) {
                    setMessages(result);
                    console.log("working1");
                    console.log(result);
                } else {
                    console.error("API response is not an array:", error);
                }
            } catch (error) {
                console.error(error);
                console.log("working2");
            }
        };

        fetchData();
    }, []);

    function fetchAgain(){

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(BASE_URL + '/messages/' + user_id+ '/', {
                        method: "GET",
                        credentials: "include",
                        // headers: {},
                        // body: {}
                    });
                    const result = await response.json();
                    console.log(result);
                    if (Array.isArray(result)) {
                        setMessages(result);
                        console.log("working1");
                        console.log(result);
                    } else {
                        console.error("API response is not an array:", error);
                    }
                } catch (error) {
                    console.error(error);
                    console.log("working2");
                }
            };
    
            fetchData();
        }, []);
    }

    return (
        <div className="col-12 col-lg-5 col-xl-3 border-right div1-chat">
            <div className="px-4 d-none d-md-block">
                <div className="d-flex align-items-center">
                    <div className="flex-grow-1 search-bar-chat ">
                        <SearchChatBar></SearchChatBar>
                    </div>
                </div>
            </div>
            {messages.map((message) => (
                <Link onClick = {fetchAgain}to={ '/chat/' + (message.sender == user_id ? message.reciever_profile.id_user : message.sender_profile.id_user) } className="list-group-item list-group-item-action border-0"
                    key={message.id} 
                >
                    <div className="d-flex align-items-start chat-person">
                    {console.log("aa" ,message.sender_profile.id_user, user_id)}
                        <img
                        
                            src={message.sender_profile.id_user != user_id ? message.sender_profile.profileimg : message.reciever_profile.profileimg}
                            className="rounded-circle mr-1 chat-pfp"
                            
                            width={40}
                            height={40}
                        />
                        <div className="flex-grow-1 ml-3">
                            { message.sender_profile.id_user != user_id ? message.sender_profile.user : message.reciever_profile.user}
                            <div className="small">
                                {message.msg}
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
            <hr className="d-block d-lg-none mt-1 mb-0" />
        </div>
    );
}

export default ChatContacts;