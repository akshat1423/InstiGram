import { useRecoilValue } from "recoil";
import ImageInput from "../ImageInput/ImageInput";
import PopupCard from "../PopupCard/PopupCard";
import SelectInput from "../SelectInput/SelectInput";
import { detailsAtom } from "../../store/detailsAtom";
import { darkModeAtom } from "../../store/darkModeAtom";
import './EditForm.css';
import { useNavigate } from "react-router-dom";

export default function EditForm({ handleSubmit }) {
    const details = useRecoilValue(detailsAtom);
    const darkMode = useRecoilValue(darkModeAtom);
    const navigate = useNavigate();

    return (
        <>
            <PopupCard>
                <div className="details-title">
                    Edit Profile
                </div>
                <div className="edit-close-button-div" onClick={() => navigate(-1)}></div>
                <form className="setup-form" onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor='bio' className='dark' >Bio: </label>
                    <ImageInput name="image" id="image" />
                    <div className="form-inputs">
                        <label htmlFor="username-edit" className="username-label">Username: </label>
                        <input type="text" id="username-edit" className="username-edit" name="username" defaultValue={details.username} required/>
                        <label htmlFor='bio' className='bio-label dark'>Bio: </label>
                        <textarea name='bio' id='bio' cols="30" rows="10" className='dark' defaultValue={details.bio} />
                        <SelectInput placeholder="Department" name="department" id="department" type="text" defaultValue={details.department} />
                        <div className="details">
                            <SelectInput placeholder="Degree" name="degree" id="degree" type="text" defaultValue={details.degree} />
                            <SelectInput placeholder="Year" name="year" id="year" type="text" defaultValue={details.gradYear} />
                        </div>

                        <div className="submit-div">
                            <button type="submit" className={"edit-submit " + (darkMode ? "dark" : "")}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </PopupCard>
        </>
    )
}