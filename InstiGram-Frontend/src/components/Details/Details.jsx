import "./Details.css"

function Details(){

    return(
        <div className="daughter-2">
                <div className="head">
                <h2 className="username">username</h2>
                <br className="break-line-1"></br>
                <button type="button" className="follow-button">Follow</button>
                <button type="button" className="message-button">Message</button>
                </div>

                <div className="list"><ul>
                    <li>Posts <br /> n1</li>
                    <li>Followers <br /> n2</li>
                    <li className="show-following">Following <br /> n3</li>
                </ul>
                </div>
                <div className="bio">
                    <b className="name">Name</b>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio molestiae, architecto explicabo maiores vero ipsum harum autem ipsa. Vel exercitationem, voluptate illo velit unde nisi debitis cupiditate quia nam voluptatem?</p>
                </div>
            </div>
    );

}

export default Details