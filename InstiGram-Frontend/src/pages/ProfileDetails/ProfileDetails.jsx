import { useNavigate } from "react-router-dom";
import PopupCard from "../../components/PopupCard/PopupCard";
import ProfileSetupForm from "../../components/ProfileSetupForm/ProfileSetupForm";
import { useRecoilValue } from "recoil";
import { imageAtom } from "../../store/imageAtom";
import './ProfileDetails.css'
import { BASE_URL } from "../../App";
import { useEffect } from "react";

export default function ProfileSetup() {
    const navigate = useNavigate();
    const image = useRecoilValue(imageAtom);

    // useEffect(() => {
    //     fetch(`${BASE_URL}/cookie`, {
    //         method: "POST",
    //         credentials: "include",
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //     })
    //         .then(async function(res) {
    //             const status = res.status;
    //             const json = await res.json();

    //             if (status == 401) {
    //                 navigate('/signin')
    //             }
    //         })
        
    // }, [])

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

        fetch(`${BASE_URL}/profile/details`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async function(res) {
                const status = res.status;
                const json = await res.json();

                if(status == 200) {
                    navigate('/feed');
                }
            })
    }

    return (
        <div className="main">
            <div className="details-background">
                <ProfileSetupForm handleSubmit={ handleSubmit }></ProfileSetupForm>
            </div>

            {/* <DarkModeSwitch></DarkModeSwitch> */}
        </div>
    )
}