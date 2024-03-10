import './AnimatedTextInput.css';
import { darkModeAtom } from '../../store/darkModeAtom';
import { useRecoilValue,useRecoilState } from 'recoil';

import eye from '../../assets/eye-solid.svg';
import eyeSlash from '../../assets/eye-slash-solid.svg';

import eyeDark from '../../assets/eye-solid-dark.svg';
import eyeSlashDark from '../../assets/eye-slash-solid-dark.svg';
import { showAtom } from '../../store/showAtom';
import { equalAtom } from '../../store/equalAtom';


export default function AnimatedTextInput({ placeholder, id, type, name, ...rootAttributes }) {

    const darkMode = useRecoilValue(darkModeAtom);
    const equal = useRecoilValue(equalAtom);
    const [show, setShow] = useRecoilState(showAtom);

    if (name == "confirm") {
        return (
            <>
                <input type={ show ? "text" : "password" } name={ name } id={ id } className={(darkMode ? "dark" : "") + " " + (equal ? "" : "error")} {...rootAttributes} required/>
                <label htmlFor={ id } className='dark' >{ placeholder }</label>
                <div onClick={() => setShow(!show)} className="eye">
                    <img src={ show ? eye : eyeSlash } alt="" className='' />
                    {/* <img src={ show ? eyeDark : eyeSlashDark} alt="" className='dark' /> */}
                </div>
                <p className={ equal ? "hidden" : "error-msg"}>Confirm Password must be the same as Password!</p>
            </>
        )
    } else if ( type == "password") {
        return (
            <>
                <input type={ show ? "text" : "password" } name={ name } id={ id } className='dark' {...rootAttributes} required/>
                <label htmlFor={ id } className='dark' >{ placeholder }</label>
                <div onClick={() => setShow(!show)} className="eye">
                    <img src={ show ? eye : eyeSlash } alt="" className='' />
                    {/* <img src={ show ? eyeDark : eyeSlashDark} alt="" className='dark' /> */}
                </div>
            </>
        )
    } else if ( name == "username") {
        return (
            <>
                <input type={ type } name={ name } id={ id } className='dark' {...rootAttributes} required />
                <label htmlFor={ id } className='dark' >{ placeholder }</label>
            </>
        )
    } else {
        return (
            <>
                <input type={ type } name={ name } id={ id } className='dark' {...rootAttributes} required />
                <label htmlFor={ id } className='dark' >{ placeholder }</label>
            </>
        )
    }
}