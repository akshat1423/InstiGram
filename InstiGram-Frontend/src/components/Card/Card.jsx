import React from "react";
import { useRecoilValue } from 'recoil';
import './Card.css';
import { darkModeAtom } from "../../store/darkModeAtom";

export default function Card({ children, ...rootAttributes }) {
    const darkMode = useRecoilValue(darkModeAtom)

    return (
        <div className={ darkMode ? "card darkMode" : "card" } { ...rootAttributes }>
            { children }
        </div>
    )
}