import './SelectInput.css';
import { darkModeAtom } from '../../store/darkModeAtom';
import { useRecoilValue,useRecoilState } from 'recoil';

export default function SelectInput({ placeholder, id, type, name, ...rootAttributes }) {

    const darkMode = useRecoilValue(darkModeAtom);

    if ( name == "degree") {
        return (
            <>
                <select name={ name } id={ id } className={darkMode ? "dark" : ""} defaultValue='' {...rootAttributes} >
                    <option value="" disabled >--{ placeholder }--</option>
                    <option value="btech">BTech</option>
                    <option value="mtech">MTech</option>
                    <option value="bsc">BSc</option>
                    <option value="msc">MSc</option>
                    <option value="dd">DD</option>
                    <option value="phd">PhD</option>
                </select>
                <label htmlFor={ id }>{ placeholder }</label>
            </>
        )
    } else if ( name == "year") {
        return (
            <>
                <select name={ name } id={ id } className={darkMode ? "dark" : ""} defaultValue='' {...rootAttributes} >
                    <option value="" disabled >--{ placeholder }--</option>
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
                    <option value="5">Fifth Year</option>
                </select>
                <label htmlFor={ id }>{ placeholder }</label>
            </>
        )
    } else if (name == "department") {
        return (
            <>
                <select name={ name } id={ id } className={darkMode ? "dark" : ""} defaultValue='' {...rootAttributes} >
                    <option value="" disabled >--{ placeholder }--</option>
                    <option value="civil">Civil Engineering</option>
                    <option value="aero">Aerospace Engineering</option>
                    <option value="chemical">Chemical Engineering</option>
                    <option value="chemistry">Chemistry</option>
                    <option value="envi">Environmental Science</option>
                    <option value="maths">Mathematics</option>
                    <option value="elec">Electrical Engineering</option>
                    <option value="cs">Computer Science</option>
                    <option value="phys">Physics</option>
                    <option value="energy">Energy Science and Engineering</option>
                </select>
                <label htmlFor={ id }>{ placeholder }</label>
            </>
        )
    }
}