import { useRecoilState, useRecoilValue } from 'recoil';
import './ImageInput.css';
import { darkModeAtom } from '../../store/darkModeAtom';
import { imageAtom } from '../../store/imageAtom';

export default function ImageInput({ id, name, ...rootAttributes}) {
    const darkMode = useRecoilValue(darkModeAtom);
    const [image, setImage] = useRecoilState(imageAtom);

    function imageUpload(event) {
        if(event.target.files && event.target.files[0]) {
            let reader = new FileReader();

            reader.onload = (e) => {
                setImage(e.target.result);
                console.log(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    return (
        <>
            <input type="file" id={ id } name={ name } accept="image/*" onChange={ imageUpload } />
            <label htmlFor={ id } id="profile-img" className={darkMode ? "dark" : ""}>
                <img src={ image } alt="" className="selected-img" />
            </label>
        </>
    )
}