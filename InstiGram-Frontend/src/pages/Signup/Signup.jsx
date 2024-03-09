import { useRecoilState } from 'recoil';
import Card from '../../components/Card/Card';
import SignupForm from '../../components/SignupForm/SignupForm';
import DarkModeSwitch from '../../components/DarkModeSwitch/DarkModeSwitch';
import { useNavigate } from 'react-router-dom';
import { validAtom } from '../../store/validAtom';
import SideCard from '../../components/SideCard/SideCard';

function Signup() {
    const navigate = useNavigate();
    const [valid, setValid] = useRecoilState(validAtom)

    function handleSubmit(e) {
        const pass = document.getElementsByName('password')[0].value;
        const confirm = document.getElementsByName('confirm')[0].value;
        
        e.preventDefault();

        if (pass == confirm) {
            const formData = new FormData(e.target);

            const data = {
                username: formData.get('username'),
                password: formData.get('password'),
                roll: formData.get('roll'),
            }

            fetch("http://127.0.0.1:8000/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data),
            })
                .then(async function(res) {
                    const status = res.status;
                    const json = await res.json();

                    if (status == 200) {
                        navigate('/profile/details');
                        setValid({
                            username: true,
                            password: true,
                            roll: true
                        })

                        localStorage.setItem("userId", json.userId);

                    } else if(status == 409) {
                        if (json.data == "username") {
                            setValid({
                                username: false,
                                password: true,
                                roll: true
                            })
                            alert('Username Taken');
                        } else if (json.data == "roll") {
                            setValid({
                                username: true,
                                password: true,
                                roll: false
                            })
                            alert('Roll Number Taken');
                        }
                    }
                })
        }
    }

    return (
        <div className='main'>
            <Card id='signup-card'>
                <SignupForm handleSubmit={ handleSubmit }></SignupForm>
            </Card>

            <SideCard title='SIGNUP'></SideCard>
            {/* <DarkModeSwitch></DarkModeSwitch> */}
        </div>
    )
}

export default Signup;