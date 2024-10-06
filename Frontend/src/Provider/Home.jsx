import React, { useState } from 'react';
import { FaSearch, FaPen, FaComments, FaCheckCircle, FaHome, FaUser, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom';

const BidderHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
    const navi=useNavigate();
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

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
                    <div>My Bids</div>
                    <div onClick={()=>navi("/bidder-profile")}>Profile</div>
                </div>
                <div >
                    <h1>Welcome, Bidder!</h1>
                    <p>Here's how you can use TaskBidHub to get started:</p>
                </div>

                
            </div>
        </div>
    );
};

export default BidderHome;
