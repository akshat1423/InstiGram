import { useNavigate } from "react-router-dom";
import PopupCard from "../../components/PopupCard/PopupCard";
import ProfileSetupForm from "../../components/ProfileSetupForm/ProfileSetupForm";
import { useRecoilValue } from "recoil";
import { imageAtom } from "../../store/imageAtom";

export default function ProfileSetup() {
    const navigate = useNavigate();
    const image = useRecoilValue(imageAtom);

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        
        const userId = localStorage.getItem('userId');

        const data = {
            userId: userId,
            bio: formData.get('bio'),
            department: formData.get('department'),
            degree: formData.get('degree'),
            year: formData.get('year'),
            profileImage: image,
        }

        fetch("http://localhost:8000/profile/details", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async function(res) {
                const status = res.status;
                const json = await res.json();
                // console.log(data)
                console.log(json);

                if(status == 200) {
                    navigate('/feed');
                }
            })
    }

    return (
        <div className="main">
            <PopupCard>
                <ProfileSetupForm handleSubmit={ handleSubmit }></ProfileSetupForm>
            </PopupCard>

            {/* <DarkModeSwitch></DarkModeSwitch> */}
        </div>
    )
}