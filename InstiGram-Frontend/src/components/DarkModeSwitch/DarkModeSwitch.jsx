import React from 'react';
import { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import './DarkModeSwitch.css';
import { darkModeAtom } from "../../store/darkModeAtom";

export default function DarkModeSwitch({ ...rootAttributes }) {

    const [darkMode,setDarkMode] = useRecoilState(darkModeAtom)

    useEffect(() => {
        document.body.classList.toggle('darkMode', darkMode)
    },[darkMode])

    return (
        <>
            <label className="switch" { ...rootAttributes}>
                <input type="checkbox" name="dark" id="dark" onChange={() => setDarkMode(!darkMode)} checked={ darkMode }/>
                <span className="slider"></span>
            </label>
        </>
    )
}