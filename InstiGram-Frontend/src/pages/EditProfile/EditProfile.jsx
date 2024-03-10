import { useRecoilValue } from "recoil";
import { imageAtom } from "../../store/imageAtom";
import { useNavigate } from "react-router-dom";
import EditForm from "../../components/EditForm/EditForm";
import './EditProfile.css';
import SideNav from "../../components/NavBar/SideNav";

export default function EditProfile() {
    const image = useRecoilValue(imageAtom);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        
        const userId = localStorage.getItem('userId');

        const data = {
            userId: userId,
            username: formData.get('username'),
            bio: formData.get('bio'),
            department: formData.get('department'),
            degree: formData.get('degree'),
            year: formData.get('year'),
            profileImage: image,
        }

        fetch("http://localhost:8000/profile/edit", {
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
                } else if (status == 409) {
                    alert("Username Taken");
                }
            })
    }

    return (
        <div className="overlay">
            <EditForm handleSubmit={ handleSubmit } />
        </div>
    )
}