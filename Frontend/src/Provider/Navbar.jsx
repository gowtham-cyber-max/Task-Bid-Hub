import React, { useState } from 'react';
import '../Client/Style/User-NavBar.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideBar from './SideBar';

function BidderNavBar() {
  const selector = useSelector((state) => state.bidder);
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
          src="https://th.bing.com/th/id/OIG3.kGF3lW2XNtL7QGDChW.b?w=1024&h=1024&rs=1&pid=ImgDetMain" 
          alt="TaskBidHub Logo" 
          className="navbar-logo-image"
        />
        <span className="navbar-title">TaskBidHub</span>
      </div>

      {sidebar && <SideBar handleClose={toggleSideBar} />}
      
      {selector?.bidder === null ? (
        <>
          <p onClick={handleSignIn} className="navbar-item">Sign In</p>
          <p onClick={handleSignUp} className="navbar-item">Sign Up</p>
        </>
      ) : (
        <p className="navbar-username">{selector?.bidder?.name}</p>
      )}
    </div>
  );
}

export default BidderNavBar;
