import { useRecoilValue } from 'recoil'
import { darkModeAtom } from '../../store/darkModeAtom'
import AnimatedTextInput from '../AnimatedTextInput/AnimatedTextInput'
import ImageInput from '../ImageInput/ImageInput'
import SelectInput from '../SelectInput/SelectInput'
import './ProfileSetupForm.css'

export default function ProfileSetupForm({ handleSubmit }) {
    const darkMode = useRecoilValue(darkModeAtom);

    return (
        <>
            <div className="details-title">
                Profile Details
            </div>
            <form className="setup-form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor='bio' className='dark' >Bio: </label>
                <ImageInput name="image" id="image" />
                <label htmlFor='bio' className='bio-label dark'>Bio: </label>
                <textarea name='bio' id='bio' cols="30" rows="10" className='dark' />
                <SelectInput placeholder="Department" name="department" id="department" type="text" required />
                <div className="details">
                    <SelectInput placeholder="Degree" name="degree" id="degree" type="text" required />
                    <SelectInput placeholder="Year" name="year" id="year" type="text" required />
                </div>

                <div className="submit-div">
                    <button type="submit" className={"submit " + (darkMode ? "dark" : "")}>
                        Next
                    </button>
                </div>
            </form>
        </>
    )
}