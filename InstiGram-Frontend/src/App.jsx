import React,{ Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import './mediaqueries.css';
import Loading from './pages/Loading/Loading';
import "./assets/fonts/Poor_Story/PoorStory-Regular.ttf"


const Signup = React.lazy(() => import('./pages/Signup/Signup'));
const ProfileDetails = React.lazy(() => import('./pages/ProfileDetails/ProfileDetails'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const Feed = React.lazy(() => import('./pages/Feed/Feed'));
const Error = React.lazy(() => import('./pages/Error/Error'));


function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <Suspense fallback={ <Loading /> }>
            <Routes>
              <Route path='/' element={ <Signup /> } />
              <Route path='/signin' element={ <Login /> } />
              <Route path='/profile/details' element={ <ProfileDetails />} />
              <Route path='/profile' element={ <Profile /> } />
              <Route path='/feed' element={ <Feed />} />
              <Route path='/loading' element={ <Loading /> } />
              <Route path='/redirect' element={ <Error /> }/>
              <Route path='*' element={ <Navigate to='/redirect' />} />
            </Routes>
          </Suspense>
        </BrowserRouter>      
      </RecoilRoot>
    </>
  )
}

export default App
