import { useRecoilValue, useSetRecoilState } from "recoil";
import { imageAtom } from "../../store/imageAtom";
import { useNavigate } from "react-router-dom";
import EditForm from "../../components/EditForm/EditForm";
import './EditProfile.css';
import { motion } from 'framer-motion';
import { detailsAtom } from "../../store/detailsAtom";
import { BASE_URL } from "../../App";
import { useEffect } from "react";

const mainVariant = {
    initial: {
        y: '100vh',
        opacity: 0,
    },
    animate: {
        opacity: 1,
        y: 0,
    },
    exit: {
        y: '100vh',
    }
}

const overlayVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        delay: 0.5,
    },
    exit: {
        opacity: 0,
    }
}

export default function EditProfile() {
    const image = useRecoilValue(imageAtom);
    const setDetails = useSetRecoilState(detailsAtom);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/cookie`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then(async function(res) {
                const status = res.status;
                const json = await res.json();

                if (status == 401) {
                    navigate('/signin')
                }
            })
        
    }, [])

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


        fetch(`${BASE_URL}/profile/edit`, {
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
                // console.log(data)
                console.log(json);

                if(status == 200) {
                    setDetails(data);
                    navigate('/feed');
                } else if (status == 409) {
                    alert("Username Taken");
                } else if (status == 401) {
                    navigate('/signin');
                }
            })
    }

    return (
        <motion.div className="edit-overlay" 
        variants={overlayVariant}
        initial='initial'
        animate='animate'
        exit='exit'
        >
            <motion.div className="edit-animate-container"
            variants={mainVariant}
            >
                <EditForm handleSubmit={ handleSubmit } />
            </motion.div>
        </motion.div>
    )
}