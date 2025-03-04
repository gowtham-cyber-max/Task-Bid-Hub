import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./Style/Bidder-Profile.css"

function BidderProfile() {
  const [activeTab, setActiveTab] = useState('bidded'); // State to manage active tab
  const selector = useSelector((state) => state.bidder);
  const bidder = selector?.bidder || {};

  return (
    <div className="profile-container">
      <h1 className="profile-title">Bidder Profile</h1>
      
      <div className="profile-card">
        {/* General Information Section */}
        <div className="general-info">
          <h3>General Information</h3>
          <p className="profile-item"><strong>Name:</strong> {bidder.name}</p>
          <p className="profile-item"><strong>Email:</strong> {bidder.email}</p>
          <p className="profile-item"><strong>Mobile:</strong> {bidder.mobile}</p>
          <p className="profile-item"><strong>Company:</strong> {bidder.companyName}</p>
          <p className="profile-item"><strong>Proof:</strong> {bidder.proof}</p>
        </div>

        {/* Skills Section */}
        <div className="skill-section">
          <h3>Skills</h3>
          <ul className="skill-list">
            {bidder.skills?.length ? (
              bidder.skills.map((skill, index) => (
                <li key={index} className="skill-item">{skill}</li>
              ))
            ) : (
              <li>No skills listed</li>
            )}
          </ul>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="tab-nav">
        <button
          className={`tab-btn ${activeTab === 'bidded' ? 'active' : ''}`}
          onClick={() => setActiveTab('bidded')}
        >
          Bidded Tasks
        </button>
        <button
          className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed Tasks
        </button>
        <button
          className={`tab-btn ${activeTab === 'queue' ? 'active' : ''}`}
          onClick={() => setActiveTab('queue')}
        >
          Task Queue
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'bidded' && (
          <div className="task-section">
            <h3>Bidded Tasks</h3>
            <p className="profile-item"><strong>Tasks Bidded:</strong> {bidder.taskBidded?.length || 0}</p>
            <ul className="task-list">
              {bidder.taskBidded?.map((task, index) => (
                <li key={index} className="task-item">{task}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'completed' && (
          <div className="task-section">
            <h3>Completed Tasks</h3>
            <p className="profile-item"><strong>Tasks Completed:</strong> {bidder.taskCompleted?.length || 0}</p>
            <ul className="task-list">
              {bidder.taskCompleted?.map((task, index) => (
                <li key={index} className="task-item">{task}</li>
              ))}
            </ul>
          </div>
        )}
        {activeTab === 'queue' && (
          <div className="task-section">
            <h3>Task Queue</h3>
            <p className="profile-item"><strong>Task Queue:</strong> {bidder.taskQueue?.length || 0}</p>
            <ul className="task-list">
              {bidder.taskQueue?.map((task, index) => (
                <li key={index} className="task-item">{task}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default BidderProfile;
