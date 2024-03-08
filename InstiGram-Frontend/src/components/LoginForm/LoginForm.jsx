import React from 'react';
import { useRecoilValue } from 'recoil';
import AnimatedTextInput from "../AnimatedTextInput/AnimatedTextInput";
import './LoginForm.css'
import { darkModeAtom } from '../../store/darkModeAtom';
import { Link } from 'react-router-dom';

export default function LoginForm({ handleSubmit }) {
    const darkMode = useRecoilValue(darkModeAtom);
    
    return (
        <div className={ darkMode ? "login darkMode" : "login"}>
            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                <div className={ darkMode ? "login-title dark" : "login-title"}>
                    Log In
                </div>
                
                <div className="inputs">
                    <>
                        <AnimatedTextInput defaultValue="" placeholder="Username" name="username" id="username" type="text" autoComplete="name" />
                        <br />
                        <AnimatedTextInput defaultValue="" placeholder="Password" name="password" id="password" type="password" autoComplete="new-password"/>
                    </>
                </div>

                <div className="submit-div">
                    <button type="submit" className={ darkMode ? "submit dark" : "submit"}>Log In</button>
                </div>

                <hr />
                
                <div className="text-div">
                    <p className="text">New to Instigram?</p>
                    <Link to='/'>Sign Up</Link>
                </div>
            </form>
        </div>
    )
}