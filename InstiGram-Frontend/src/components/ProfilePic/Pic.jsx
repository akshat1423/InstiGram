
import "./Pic.css"
import React from 'react';
import {useRecoilState, useRecoilValue } from 'recoil';
import {imageAtom} from "../../store/imageAtom.jsx"




function Pic(){

    const DP = useRecoilValue(imageAtom);



    return(
        <div className="daughter-1">
        <img src={ DP } width="10.417vw" height="10.417vw" onError={(e) => {e.target.style.display = "none"}}></img>
        </div>
    );
}

export default Pic