import { useNavigate } from 'react-router-dom'
import PopupCard from '../PopupCard/PopupCard'
import './CreatePostForm.css'
import { darkModeAtom } from '../../store/darkModeAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { createPostAtom } from '../../store/createPostAtom';

export default function CreatePostForm({ handleSubmit }) {
    const darkMode = useRecoilValue(darkModeAtom);
    const [createPost, setCreatePost] = useRecoilState(createPostAtom);
    const navigate = useNavigate();

    function imageUpload(event) {
        if(event.target.files && event.target.files[0]) {
            let reader = new FileReader();

            reader.onload = (e) => {
                setCreatePost(e.target.result);
                console.log(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    return (
        <>
            <PopupCard>
                <div className="create-title">
                    Create Post
                </div>
                <div className="create-close-button-div" onClick={() => navigate(-1)}></div>
                <form className="create-post-form" onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="create-image" className='create-image-label'>
                        <div className={"create-image-label-container " + (createPost ? "hide" : "")}>
                            <div className="create-image-label-icon"></div>
                            <div className="create-image-label-text">Add Photo</div>
                        </div>
                        <div className="">
                            <img src={ createPost } className='selected-create-image' />
                        </div>
                    </label>
                    <input type="file" id="create-image" name="image" accept="image/*" onChange={ imageUpload } className={'image-input '} />
                    <div className="create-form-inputs">
                        <label htmlFor="caption" className="caption-label">Caption: </label>
                        <textarea name='caption' id='caption' cols="30" rows="10" className='dark' />
                    </div>
                    <div className="submit-div">
                        <button type="submit" className={"create-submit " + (darkMode ? "dark" : "")}>
                            Post
                        </button>
                    </div>
                </form>
            </PopupCard>
        </>
    )
}