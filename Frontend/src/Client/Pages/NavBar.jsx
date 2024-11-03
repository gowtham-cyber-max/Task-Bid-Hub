import React, { useState } from 'react';
import '../Style/User-NavBar.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

function UserNavBar() {
  const selector = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  const handleSignIn = () => navigate("/user-login");
  const handleSignUp = () => navigate("/user-signup");
  const toggleSideBar = () => setSidebar(!sidebar);

  return (
    <div className="navbar-container">
      <button onClick={toggleSideBar} className="user-sidebar-toggle">☰</button>
      
      {/* TaskBidHub Logo and Title */}
      <div className="navbar-logo">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcF1hpnk1QJrYWiU8FdUbfK01kAajQulUK6g&s" 
          alt="TaskBidHub Logo" 
          className="navbar-logo-image"
        />
        <span className="navbar-title">TaskBidHub</span>
      </div>

      {sidebar && <SideBar handleClose={toggleSideBar} />}
      
      {selector?.user === null ? (
        <>
          <p onClick={handleSignIn} className="navbar-item">Sign In</p>
          <p onClick={handleSignUp} className="navbar-item">Sign Up</p>
        </>
      ) : (
        <p className="navbar-username">{selector?.user?.name}</p>
      )}
    </div>
  );
}

export default UserNavBar;
