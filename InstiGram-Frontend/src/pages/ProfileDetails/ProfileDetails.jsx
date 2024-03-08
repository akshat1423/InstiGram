import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import DarkModeSwitch from "../../components/DarkModeSwitch/DarkModeSwitch";
import ProfileSetupForm from "../../components/ProfileSetupForm/ProfileSetupForm";

export default function ProfileSetup() {
    const navigate = useNavigate();

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
            profileImage: formData.get('image'),
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
                    navigate('/interests');
                }
            })
    }

    return (
        <div className="main">
            <Card>
                <ProfileSetupForm handleSubmit={ handleSubmit }></ProfileSetupForm>
            </Card>

            <DarkModeSwitch></DarkModeSwitch>
        </div>
    )
}