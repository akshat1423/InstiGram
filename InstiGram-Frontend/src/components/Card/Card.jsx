import React from "react";
import { useRecoilValue } from 'recoil';
import './Card.css';
import { darkModeAtom } from "../../store/darkModeAtom";

export default function Card({ children, ...rootAttributes }) {
    const darkMode = useRecoilValue(darkModeAtom)

    return (
        <>
            <div className="background-1"></div>
            <div className="background-2"></div>
            <div className={ darkMode ? "card darkMode" : "card" } { ...rootAttributes }>
                { children }
            </div>
        </>
    )
}