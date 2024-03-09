import React from "react";
import { useRecoilValue, useRecoilState } from 'recoil';
import AnimatedTextInput from "../AnimatedTextInput/AnimatedTextInput";
import './SignupForm.css'
import { Link } from "react-router-dom";
import { darkModeAtom } from "../../store/darkModeAtom";
import { equalAtom } from "../../store/equalAtom";

export default function SignupForm({ handleSubmit }) {

    const darkMode = useRecoilValue(darkModeAtom);
    const [equal, setEqual] = useRecoilState(equalAtom);
    
    function checkEqual(){
        const password = document.getElementsByName('password')[0].value;
        const confirm = document.getElementsByName('confirm')[0].value;

        setEqual(password == confirm);
    }

    return (
        <div className={ darkMode ? "signup darkMode" : "signup"}>
            <div className="clip"></div>
            <div className="header">
                <div className="logo"></div>
                <div className="title">
                    <div className="slot1"></div>
                    <div className="slot2"></div>
                </div>
            </div>
            <hr className='line' />
            <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="inputs">
                    <>
                        <p className="roll-label">LDAP ID</p>
                        <div className="input">
                            <div className="arrow"></div>
                            <div className="text-input">
                                <AnimatedTextInput placeholder="Enter you LDAP ID (eg. 21b5745)" name="roll" id="roll" type="text" maxLength="7" />
                            </div>
                        </div>
                        <hr className="line" />
                        <p className="user-label">Username</p>
                        <div className="input">
                            <div className="arrow"></div>
                            <div className="text-input">
                                <AnimatedTextInput placeholder="Username" name="username" id="username" type="text" autoComplete="name" />
                            </div>
                        </div>
                        <hr className="line" />
                        <p className="pass-label">Password</p>
                        <div className="input">
                            <div className="arrow"></div>
                            <div className="text-input">
                                <AnimatedTextInput placeholder="Make a strong password" name="password" id="password" type="password" autoComplete="new-password" />
                            </div>
                        </div>
                        <hr className="line" />
                        <div className="confirm-label">Confirm Password</div>
                        <div className="input">
                            <div className="arrow"></div>
                            <div className="text-input">
                            <AnimatedTextInput placeholder="Re-enter your password" name="confirm" id="confirm" type="password" autoComplete="new-password"
                                onChange={ checkEqual } />
                            </div>
                        </div>
                        <hr className="line" />
                    </>
                </div>

                <div className="submit-div">
                    <button type="submit" className={ darkMode ? "submit dark" : "submit"} id={ equal ? "" : "prohibited"}>
                        SIGN UP
                    </button>
                </div>

                <hr className="line" />
                
                <div className="text-div">
                    <p className="text">Already have an Account?</p>
                    <Link to='/signin'>Log In</Link>
                </div>
            </form>
        </div>
    )
}