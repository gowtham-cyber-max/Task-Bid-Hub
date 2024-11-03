import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { taskList_Bidders } from '../Redux/Action/BidderAction';
import './Style/Bidder-Home.css';

const BidderHome = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
    const dispatch = useDispatch();
    const navi = useNavigate();
    const selector = useSelector((state) => state.bidder);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleTaskExplore = () => {
        dispatch(taskList_Bidders());
        navi("/bidder-task-explore");
    };

    return (
        <div className="bidder-home-container">
            <div className="bidder-home-header">
                <h1>Welcome Bidder!</h1>
                {/* <p>TaskBidHub is the perfect platform to find tasks that match your skills and earn rewards.</p> */}
                <p>Explore available tasks and start bidding to get hired for jobs that suit your expertise!.</p>
                <button className="bidder-home-button" onClick={handleTaskExplore}>
                    Explore Tasks
                </button>
            </div>
            <div className="bidder-home-image">
                <img
                    src="https://media.licdn.com/dms/image/D5612AQFqPG4xXzDXHg/article-cover_image-shrink_720_1280/0/1676526760415?e=2147483647&v=beta&t=UIMVR0r_jYkSiVMnIDBnSEakubOeT9BX_20Ry7yd5uQ" // Replace with a relevant image URL
                    alt="Motivational"
                    className="motivational-image"
                />
            </div>
        </div>
    );
};

export default BidderHome;
