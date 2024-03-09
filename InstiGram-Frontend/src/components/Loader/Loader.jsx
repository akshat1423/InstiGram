import React from 'react';
import "./Loader.css"
import { useRecoilValue } from 'recoil';
import {darkModeAtom} from '../../store/darkModeAtom.jsx'

function Loader() {
  const darkMode = useRecoilValue(darkModeAtom);
  return(
    <div className={darkMode ? 'container dark' : 'container'}>
      <p className={ darkMode ? 'loader dark ' : 'loader' } >LOADING...</p>
    </div>
  )
}

  export default Loader