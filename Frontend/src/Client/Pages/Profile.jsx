import React from 'react';
import { useSelector } from 'react-redux';
import "../Style/User-Profile.css"

function UserProfile() {
  const selector = useSelector((state) => state.user);
  const user = selector?.user || {};

  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-card">
        <p className="profile-item"><strong>Name:</strong> {user.name}</p>
        <p className="profile-item"><strong>Email:</strong> {user.email}</p>
        <p className="profile-item"><strong>Mobile:</strong> {user.mobile}</p>
        <p className="profile-item"><strong>Password:</strong> {user.pass}</p>
        <p className="profile-item"><strong>Total Tasks:</strong> {selector?.task?.length || 0}</p>
      </div>
    </div>
  );
}

export default UserProfile;
