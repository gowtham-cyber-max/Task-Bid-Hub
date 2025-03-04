import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Client Pages
import UserLogin from './Client/Pages/Login';
import UserSignUp from './Client/Pages/SignUp';
import UserHome from './Client/Pages/Home';
import AddTask from './Client/Pages/AddTask';
import UserProfile from './Client/Pages/Profile';
import ServiceList from './Client/Pages/ServiceList';
import MyTask from './Client/Pages/MyTask';
import TaskBidDetails from './Client/Pages/TaskBidDetails';
import Notification from './Client/Pages/Notification';

// Provider Pages
import BidderLogin from './Provider/Login';
import BidderSignUp from './Provider/SignUp';
import BidderHome from './Provider/Home';
import CsvInput from './Provider/CsvInput';
import BidderProfile from './Provider/Profile';
import TaskExplore from './Provider/TaskExplore';
import TaskDetail from './Provider/TaskDetail';
import MyBids from './Provider/MyBids';
import TaskInQueue from './Provider/TaskInQueue';
import CompletedTask from './Provider/CompletedTask';
import TaskInProgress from './Provider/TakInProgress';

// Common Pages
import UserMessage from './Mutual/UserMessage';
import UserNavBar from './Client/Pages/NavBar';
import BidderNavBar from './Provider/Navbar';

function Path() {
  const selector = useSelector((state) => state.user);
  const selectorBidder = useSelector((state) => state.bidder);

  return (
    <>
      {selector?.user && (
        <>
          <UserNavBar />
        </>
      )}
      {selectorBidder?.bidder && (
        <>
          <BidderNavBar />
        </>
      )}

      <Routes>
        {/* Provider Routes */}
        <Route path='/bidder-login' element={<BidderLogin />} />
        <Route path='/bidder-signup' element={<BidderSignUp />} />
        <Route path='/bidder-home' element={<BidderHome />} />
        <Route path='/upload' element={<CsvInput />} />
        <Route path='/bidder-profile' element={<BidderProfile />} />
        <Route path='/bidder-task-explore' element={<TaskExplore />} />
        <Route path='/bidder-task-details' element={<TaskDetail />} />
        <Route path='/bidder-my-bid' element={<MyBids />} />
        <Route path='/bidder-queue' element={<TaskInQueue />} />
        <Route path='/bidder-completed-task' element={<CompletedTask />} />
        <Route path='/bidder-in-progress' element={<TaskInProgress />} />

        {/* Client Routes */}
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-signup' element={<UserSignUp />} />
        <Route path='/user-home' element={<UserHome />} />
        <Route path='/user-add-task' element={<AddTask />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/user-service-list' element={<ServiceList />} />
        <Route path='/user-my-task' element={<MyTask />} />
        <Route path='/user-task-bid-list' element={<TaskBidDetails />} />
        <Route path='/user-notification' element={<Notification />} />

        {/* Common Route */}
        <Route path='/message' element={<UserMessage />} />
      </Routes>
    </>
  );
}

export default Path;
