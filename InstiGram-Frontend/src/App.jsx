import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import './App.css';
import './mediaqueries.css';
import "./assets/fonts/Poor_Story/PoorStory-Regular.ttf"
import CustomRouter from './CustomRouter';


function App() {

  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <CustomRouter />
        </BrowserRouter>      
      </RecoilRoot>
    </>
  )
}

export default App
