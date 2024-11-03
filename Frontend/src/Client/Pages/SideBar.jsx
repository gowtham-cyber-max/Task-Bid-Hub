import React, { useState } from 'react';
import '../Style/User-Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { getNotification, getUserTask } from '../../Redux/Action/UserAction';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    const navi=useNavigate();
    const dispatch=useDispatch();
    const selector=useSelector((state)=>state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const HandleMyTask = () => {
    dispatch(getUserTask(selector?.user?._id));
    toggleSidebar();
    navi("/user-my-task");
};

const HandleNotification = async () => {
    dispatch(getNotification(selector?.user?._id));
    toggleSidebar();
    navi("/user-notification");
  };
  const handleClick=()=>{
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button className="user-sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      
      <nav className={`user-sidebar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/#/user-home" onClick={handleClick}>Home</a></li>
          <li><a href="/#/user-service-list" onClick={handleClick}>Services</a></li>
          <li><a href="/#/user-add-task" onClick={handleClick}>Post a Task</a></li>
          <li><a href="/#/user-profile" onClick={handleClick}>Profile</a></li>
          <li onClick={HandleMyTask}><h2 >My Task</h2></li>
          <li onClick={HandleNotification}><h2 >Notification</h2></li>
          <li><a href="/#/user-login" onClick={handleClick}>Logout</a></li>
        </ul>
      </nav>

      
    </div>
  );
}

export default SideBar;
