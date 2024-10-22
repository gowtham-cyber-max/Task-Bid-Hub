import React, { useState } from 'react';
import { FaSearch, FaPen, FaComments, FaCheckCircle, FaHome, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Importing icons
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBidListForBidders, getBidsForQueue, taskList_Bidders } from '../Redux/Action/BidderAction';

const BidderHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
    const dispatch=useDispatch();
    const navi=useNavigate();
    const selector=useSelector((state)=>state.bidder);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const HandleTaskExplore=()=>{
        dispatch(taskList_Bidders());
        navi("/bidder-task-explore")
    }
    const HandleMyBids=()=>{
        dispatch(getBidListForBidders(selector?.bidder?._id));
        navi("/bidder-my-bid")
    }
    const HandleTaskQueue=()=>{
        dispatch(getBidsForQueue(selector?.bidder?.taskQueue));
        navi("/bidder-queue")
        
    }
    const HandleCompleted=()=>{
        // dispatch(getQueueTaskForBidders(selector?.bidder?._id));
    }
    const HandleInRequest=()=>{
        // dispatch(getQueueTaskForBidders(selector?.bidder?._id));
    }

    return (
        <div >
            <div >
                <div  onClick={toggleSidebar}>
                    <FaBars  />
                    {isSidebarOpen && 'Menu'}
                </div>
                {isSidebarOpen && (
                    <>
                        <div> Home</div>
                        <div> Profile</div>
                        <div> Logout</div>
                    </>
                )}
            </div>
            <div>
                <div >
                    <div>Home</div>
                    <div onClick={HandleMyBids}>My Bids</div>
                    <div onClick={()=>navi("/bidder-profile")}>Profile</div>
                    <div onClick={HandleTaskQueue}>Task Queue</div>
                    <div onClick={HandleCompleted}>Task Completed</div>
                    <div onClick={HandleInRequest}>Task in Progress</div>
                </div>
                <div >
                    <h1>Welcome, Bidder!</h1>
                    <p>Here's how you can use TaskBidHub to get started:</p>
                    <button onClick={HandleTaskExplore} >Task Explore</button>
                </div>

                
            </div>
        </div>
    );
};

export default BidderHome;
