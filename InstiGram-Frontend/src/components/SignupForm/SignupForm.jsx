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
            <form className="signup-form" onSubmit={(e) => handleSubmit(e)}>
                <div className={ darkMode ? "signup-title dark" : "signup-title"}>
                    Sign Up
                </div>
                
                <div className="inputs">
                    <>
                        <AnimatedTextInput placeholder="Roll Number" name="roll" id="roll" type="text" maxLength="7" />

                        <AnimatedTextInput placeholder="Username" name="username" id="username" type="text" autoComplete="name" />

                        <AnimatedTextInput placeholder="Password" name="password" id="password" type="password" autoComplete="new-password" />

                        <AnimatedTextInput placeholder="Confirm Password" name="confirm" id="confirm" type="password" autoComplete="new-password"
                        onChange={ checkEqual } />
                    </>
                </div>

                <div className="submit-div">
                    <button type="submit" className={ darkMode ? "submit dark" : "submit"} id={ equal ? "" : "prohibited"}>
                        Sign Up
                    </button>
                </div>

                <hr />
                
                <div className="text-div">
                    <p className="text">Already have an Account?</p>
                    <Link to='/signin'>Log In</Link>
                </div>
            </form>
        </div>
    )
}