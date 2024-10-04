import React from 'react'
import Home from './Provider/Home'
import Login from './Provider/Login'
import SignUp from './Provider/SignUp'
import {Route,Routes} from 'react-router-dom';
import CsvInput from './Provider/CsvInput';
import EmotionCarousel from './App';
import UserLogin from './Client/Pages/Login';
import UserHome from './Client/Pages/Home';
import BidderLogin from './Provider/Login';
import BidderHome from './Provider/Home';

function Path() {
  return (
    <>
        <Routes>
              {/* provider */}    
            <Route path='/bidder-login' element={<BidderLogin/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/bidder-home' element={<BidderHome/>}/>
            <Route path='/upload' element={<CsvInput/>}/>

            {/* client */}
            <Route path='/user-login' element={<UserLogin/>}/>
            <Route path='/user-home' element={<UserHome/>}/>
            
            
        </Routes>
        
    </>
 ) 
}

export default Path