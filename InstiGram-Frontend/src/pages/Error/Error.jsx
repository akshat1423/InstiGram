import './Error.css';
import sadFace from '../../assets/face-frown-regular.svg';
import sadFaceDark from '../../assets/face-frown-regular-dark.svg';
import DarkModeSwitch from '../../components/DarkModeSwitch/DarkModeSwitch';
import { useRecoilValue } from 'recoil';
import { darkModeAtom } from '../../store/darkModeAtom';

export default function Error() {
    const darkMode = useRecoilValue(darkModeAtom);

    return (
        <div className='main'>
            <div className="error-main">
                <div className="error-img">
                    <img src={ sadFace } alt="sad face" className={darkMode ? 'hidden' : 'sadFace'} />
                    <img src={ sadFaceDark } alt="sad face" className={darkMode ? 'sadFace' : 'hidden'} />
                </div>
                <div className="error-msg">
                    <h1>Error 404</h1>
                    <p>Page Not Found</p>
                </div>
            </div>
            <div className='switch'>
                <DarkModeSwitch /> 
            </div>
        </div>

    )
}