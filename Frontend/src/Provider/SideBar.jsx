import React, { useState } from 'react';
import "../Client/Style/User-Sidebar.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBidListForBidders, getBidsForQueue, getBidsInProgress, getCompletedTaskList, taskList_Bidders } from '../Redux/Action/BidderAction';

function SideBar() {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    
  const HandleMyBids=()=>{
      dispatch(getBidListForBidders(selector?.bidder?._id));
      handleClick();
      navi("/bidder-my-bid")
    }
    const HandleTaskQueue=async()=>{
      
      handleClick();
      if(dispatch(getBidsForQueue()))
        navi("/bidder-queue")
      
    }
    const HandleCompleted=async()=>{
    handleClick();
    dispatch(getCompletedTaskList(selector?.bidder?._id));
    navi("/bidder-completed-task")
  }
  const HandleInProgress=async()=>{
    handleClick();
    dispatch(getBidsInProgress(selector?.bidder?._id));
    navi("/bidder-in-progress")
  }
  const HandleProfile=()=>{
    handleClick();
    navi("/bidder-profile")
  }
  const HandleHome=()=>{
    handleClick();
    navi("/bidder-home")
    
  }
  const HandleTaskExplore=()=>{
    dispatch(taskList_Bidders());
    handleClick();
    navi("/bidder-task-explore")
}


    return (
        <div>
            <button className="user-sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>

            <nav className={`user-sidebar ${isOpen ? 'open' : ''}`}>
            <ul>
                <li onClick={HandleHome}><a>Home</a></li>
                <li onClick={HandleTaskExplore}><a>Task Explore</a></li>
                <li onClick={HandleMyBids}><a>My Bids</a></li>
                <li onClick={HandleProfile}><a>Profile</a></li>
                <li onClick={HandleTaskQueue}><a>Task Queue</a></li>
                <li onClick={HandleCompleted}><a>Task Completed</a></li>
                <li onClick={HandleInProgress}><a>Task in Progress</a></li>
                <li><a>Log Out</a></li>
              </ul>

            </nav>

        </div>
    );
}

export default SideBar;
