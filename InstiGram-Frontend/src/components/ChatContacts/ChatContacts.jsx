import "./ChatContacts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../App";

function ChatContacts() {
    const baseURL = "backend-api-url";
    const user_id = localStorage.getItem("user_id");

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(BASE_URL + 'api-backend' + user_id+ '/', {
                    method: "GET",
                    credentials: "include",
                    headers: {},
                    body: {}
                });
                if (Array.isArray(response.data)) {
                    setMessages(response.data);
                    console.log("working1");
                    console.log(response.data);
                } else {
                    console.error("API response is not an array:", response.data);
                }
            } catch (error) {
                console.error(error);
                console.log("working2");
            }
        };

        fetchData();
    }, []);

    return (
        <div className="col-12 col-lg-5 col-xl-3 border-right">
            <div className="px-4 d-none d-md-block">
                <div className="d-flex align-items-center">
                    <div className="flex-grow-1">
                        <input
                            type="text"
                            className="form-control my-3"
                            placeholder="Search..."
                        />
                    </div>
                </div>
            </div>
            {messages.map((message) => (
                <Link to={ '/chat/' + (message.sender === user_id ? message.reciever : message.sender) } className="list-group-item list-group-item-action border-0"
                    key={message.id} 
                >
                    <div className="d-flex align-items-start">
                        <img
                            src={message.sender.id === user_id ? message.sender_profile.image : message.receiver_profile.image}
                            className="rounded-circle mr-1"
                            alt="profilepic"
                            width={40}
                            height={40}
                        />
                        <div className="flex-grow-1 ml-3">
                            {message.reciever_profile.full_name}
                            <div className="small">
                                {message.message}
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