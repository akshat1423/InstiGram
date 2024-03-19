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
                    <option value="BTech">BTech</option>
                    <option value="MTech">MTech</option>
                    <option value="BSc">BSc</option>
                    <option value="MSc">MSc</option>
                    <option value="DD">DD</option>
                    <option value="PhD">PhD</option>
                </select>
                <label htmlFor={ id }>{ placeholder }</label>
            </>
        )
    } else if ( name == "year") {
        return (
            <>
                <select name={ name } id={ id } className={darkMode ? "dark" : ""} defaultValue='' {...rootAttributes} >
                    <option value="" disabled >--{ placeholder }--</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                </select>
                <label htmlFor={ id }>{ placeholder }</label>
            </>
        )
    } else if (name == "department") {
        return (
            <>
                <select name={ name } id={ id } className={darkMode ? "dark" : ""} defaultValue='' {...rootAttributes} >
                    <option value="" disabled >--{ placeholder }--</option>
                    <option value="Civil">Civil Engineering</option>
                    <option value="Aerospace">Aerospace Engineering</option>
                    <option value="Chemical">Chemical Engineering</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Environmental">Environmental Science</option>
                    <option value="Maths">Mathematics</option>
                    <option value="Electrical">Electrical Engineering</option>
                    <option value="CSE">Computer Science</option>
                    <option value="Physics">Physics</option>
                    <option value="Energy">Energy Science and Engineering</option>
                </select>
                <label htmlFor={ id }>{ placeholder }</label>
            </>
        )
    }
}