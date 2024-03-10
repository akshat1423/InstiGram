
import "./Pic.css"
import React from 'react';
import {useRecoilState, useRecoilValue } from 'recoil';
import {imageAtom} from "../../store/imageAtom.jsx"




function Pic(){

    const DP = useRecoilValue(imageAtom);



    return(
        <div className="daughter-1">
        <img src={ DP } width="200px" height="200px" alt="Profile image" ></img>
        </div>
    );
}

export default Pic