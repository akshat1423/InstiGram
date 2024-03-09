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
            <div className="clip"></div>
            <div className="header">
                <div className="logo"></div>
                <div className="title">
                    <div className="slot1"></div>
                    <div className="slot2"></div>
                </div>
            </div>
            <hr className='line' />
            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="inputs">
                    <>
                        <p className='username-label'>Username</p>
                        <div className="input">
                            <div className="arrow"></div>
                            <div className="text-input">
                                <AnimatedTextInput defaultValue="" placeholder="Enter your Username" name="username" id="username" type="text" autoComplete="name" />
                            </div>
                        </div>
                        <hr className='line' />
                        <p className='password-label'>Password</p>
                        <div className="input">
                            <div className="arrow"></div>
                            <div className="text-input">
                                <AnimatedTextInput defaultValue="" placeholder="Enter your Password" name="password" id="password" type="password" autoComplete="new-password"/>
                            </div>
                        </div>
                        <hr className='line' />
                    </>
                </div>

                <div className="submit-div">
                    <button type="submit" className={ darkMode ? "submit dark" : "submit"}>LOGIN</button>
                </div>

                <hr className='line' />
                
                <div className="text-div">
                    <p className="text">New to Instigram?</p>
                    <Link to='/'>Sign Up</Link>
                </div>
            </form>
        </div>
    )
}