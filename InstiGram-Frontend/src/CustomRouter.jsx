import React from "react";
import { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Loading from './pages/Loading/Loading';
import { AnimatePresence } from "framer-motion";

const Signup = React.lazy(() => import('./pages/Signup/Signup'));
const ProfileDetails = React.lazy(() => import('./pages/ProfileDetails/ProfileDetails'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const EditProfile = React.lazy(() => import('./pages/EditProfile/EditProfile'))
const Feed = React.lazy(() => import('./pages/Feed/Feed'));
const Calendar = React.lazy(() => import('./pages/Calendar/Calendar'));
const CreatePost = React.lazy(() => import('./pages/CreatePost/CreatePost'));
const Error = React.lazy(() => import('./pages/Error/Error'));
const Chat = React.lazy(() => import('./pages/Chat/Chat'));
const ChatDefault = React.lazy(() => import('./pages/ChatDefault/ChatDefault'));

// import EditProfile from './pages/EditProfile/EditProfile';


export default function CustomRouter() {
    let location = useLocation();
    let background = location.state && location.state.background;

    return (
        <>
            <Suspense fallback={ <Loading /> }>
                <Routes location={background || location}>
                    
                    <Route path='/' element={ <Signup /> } />
                    <Route path='/signin' element={ <Login /> } />
                    <Route path="/profile/:userId" element={ <Profile />} />
                    <Route path='/profile/details' element={ <ProfileDetails />} />
                    <Route path='/profile/edit' element={ <EditProfile />} />
                    <Route path='/post/create' element={ <CreatePost />} />
                    <Route path='/feed' element={ <Feed />} />
                    <Route path="/calendar" element={ <Calendar />} />
                    <Route path='/chat' element={ <ChatDefault></ChatDefault>} > {console.log("working")}</Route>
                    <Route path='/chat/:id' element={ <Chat /> }></Route>
                    <Route path='/loading' element={ <Loading /> } />
                    <Route path='/redirect' element={ <Error /> }/>
                    <Route path='*' element={ <Navigate to='/redirect' />} />
                </Routes>
                <AnimatePresence>
                    <Routes location={location} key={location.key}>
                        {background && <Route path="/profile/:userId" element={ <Profile />} />}
                        {background && <Route path="/profile/edit" element={ <EditProfile/>} />}
                        {background && <Route path="/post/create" element={ <CreatePost/>} />}
                    </Routes>
                </AnimatePresence>
            </Suspense>
        </>
    )
}