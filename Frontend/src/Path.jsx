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
import AddTask from './Client/Pages/AddTask';
import UserProfile from './Client/Pages/Profile';
import ServiceList from './Client/Pages/ServiceList';
import BidderProfile from './Provider/Profile';
import UserSignUp from './Client/Pages/SignUp';
import BidderSignUp from './Provider/SignUp';
import TaskExplore from './Provider/TaskExplore';
import TaskDetail from './Provider/TaskDetail';

function Path() {
  return (
    <>
        <Routes>
              {/* provider */}    
            <Route path='/bidder-login' element={<BidderLogin/>}/>
            <Route path='/bidder-signup' element={<BidderSignUp/>}/>
            <Route path='/bidder-home' element={<BidderHome/>}/>
            <Route path='/upload' element={<CsvInput/>}/>
            <Route path='/bidder-profile' element={<BidderProfile/>}/>
            <Route path='/bidder-task-explore' element={<TaskExplore/>}/>
            <Route path='/bidder-task-details' element={<TaskDetail/>}/>

            {/* client */}
            <Route path='/user-login' element={<UserLogin/>}/>
            <Route path='/user-home' element={<UserHome/>}/>
            <Route path='/user-add-task' element={<AddTask/>}/>
            <Route path='/user-profile' element={<UserProfile/>}/>
            <Route path='/user-service-list' element={<ServiceList/>}/>
            <Route path='/user-signup' element={<UserSignUp/>}/>
            
            
        </Routes>
        
    </>
 ) 
}

export default Path