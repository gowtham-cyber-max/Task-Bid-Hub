import React, { useState } from 'react';
import { FaSearch, FaPen, FaComments, FaCheckCircle, FaHome, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Importing icons
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { taskList_Bidders } from '../Redux/Action/BidderAction';

const BidderHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
    const dispatch=useDispatch();
    const navi=useNavigate();
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const HandleTaskExplore=()=>{
        dispatch(taskList_Bidders());
        navi("/bidder-task-explore")
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
                    <div onClick={()=>navi("/bidder-my-bid")}>My Bids</div>
                    <div onClick={()=>navi("/bidder-profile")}>Profile</div>
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
