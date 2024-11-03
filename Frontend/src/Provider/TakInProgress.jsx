import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import "./Style/Bidder-Task_Progress.css";

function TaskInProgress() {
  const navigate = useNavigate();
  const selector = useSelector((state) => state.bidder);
  const bids = selector?.bids || [];

  const handleMessage = (bid) => {
    navigate("/message", { state: bid });
  };

  return (
    <div className="task-progress-container">
      <h1 className="task-progress-header">Progress</h1>
      {bids.length > 0 ? (
        <div className="task-progress-list">
          {bids.map((bid) => (
            <div key={bid._id} className="task-progress-card">
              <div className="task-progress-details">
                <p className="task-progress-detail"><span className="task-label">Bid Amount:</span> {bid.amount}</p>
                <p className="task-progress-detail"><span className="task-label">Description:</span> {bid.description}</p>
                <p className="task-progress-detail"><span className="task-label">Task ID:</span> {bid.taskId}</p>
                <p className="task-progress-detail"><span className="task-label">User ID:</span> {bid.userId}</p>
              </div>
              <button 
                className="task-message-button" 
                onClick={() => handleMessage(bid)}
              >
                Message
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-bids-message">No bids available.</p>
      )}
    </div>
  );
}

export default TaskInProgress;
