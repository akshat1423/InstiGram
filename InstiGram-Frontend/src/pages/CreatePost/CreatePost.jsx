import React, { useEffect } from 'react';
import './CreatePost.css';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { createAtom } from '../../store/pageAtoms';
import { motion } from 'framer-motion';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm';
import SideNav from '../../components/NavBar/SideNav';
import { createPostAtom } from '../../store/createPostAtom';
import { postAtom } from '../../store/postAtom';
import { BASE_URL } from '../../App';

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

export default function CreatePost() {
    const setCreate = useSetRecoilState(createAtom);
    const createPost = useRecoilValue(createPostAtom);
    const [profilePosts, setProfilePosts] = useRecoilState(postAtom);

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        
        const userId = localStorage.getItem('userId');

        const data = {
            userId: userId,
            postImage: createPost,
            caption: formData.get('caption'),
            likes: 0,
            comments: 0,
        }

        fetch(`${BASE_URL}/post/create`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async function(res) {
                const json = await res.json();
                console.log(data)
                console.log(json);

                if (res.status == 200) {
                    setProfilePosts([
                        ...profilePosts,
                        data,
                    ]);
                }
                navigate('/feed')
            })
    }

    useEffect(() => {
        setCreate(true);
    
        return () => {
            setCreate(false);
        }
    }, [])

    return (
        <>
            <motion.div className="create-overlay"
            variants={overlayVariant}
            initial='initial'
            animate='animate'
            exit='exit'
            >
                <SideNav className='create-sidebar'></SideNav>
                <motion.div className="create-animate-container" 
                variants={mainVariant}
                >
                    <div className="scrollable-container">
                        <CreatePostForm handleSubmit={ handleSubmit }></CreatePostForm>
                    </div>
                </motion.div>
            </motion.div>
        </>
    )
}