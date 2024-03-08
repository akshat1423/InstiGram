import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import LoginForm from "../../components/LoginForm/LoginForm";
import DarkModeSwitch from "../../components/DarkModeSwitch/DarkModeSwitch";
import { validAtom } from "../../store/validAtom";

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

        fetch("http://127.0.0.1:8000/signin", {
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
                } else if (status == 409) {
                    alert("Wrong username or Password");
                    if (json.data == "username") {
                        setValid({
                            username: false,
                            password: true,
                            roll: true
                        })
                    } else if (json.data == "password") {
                        setValid({
                            username: true,
                            password: false,
                            roll: true,
                        })
                    }
                }
            })
    }

    return (
        <div className="main">
            <Card id='login-card'>
                <LoginForm handleSubmit={ handleSubmit }></LoginForm>
            </Card>

            <DarkModeSwitch></DarkModeSwitch>
        </div>
    )
}

export default Login;