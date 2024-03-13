import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import LoginForm from "../../components/LoginForm/LoginForm";
import DarkModeSwitch from "../../components/DarkModeSwitch/DarkModeSwitch";
import { validAtom } from "../../store/validAtom";
import SideCard from '../../components/SideCard/SideCard';
import { BASE_URL } from '../../App';

function Login() {
    const navigate = useNavigate();
    const [valid, setValid] = useRecoilState(validAtom);

    function handleSubmit(e) {
        const formData = new FormData(e.target);

        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        }
        
        e.preventDefault();

        fetch(`${BASE_URL}/signin`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data),
        })
            .then( async function(res) {
                const status = res.status;
                const json = await res.json();

                if (status == 200) {
                    navigate('/feed');
                    setValid({
                        username: true,
                        password: true,
                        roll: true
                    })

                    localStorage.setItem("userId", json.userId);

                } else if (status == 409) {
                    alert("Wrong Username or Password");
                }
            })
    }

    return (
        <div className="main">
            <Card id='login-card'>
                <LoginForm handleSubmit={ handleSubmit }></LoginForm>
            </Card>
            <SideCard title='LOGIN'></SideCard>

            {/* <DarkModeSwitch></DarkModeSwitch> */}
        </div>
    )
}

export default Login;