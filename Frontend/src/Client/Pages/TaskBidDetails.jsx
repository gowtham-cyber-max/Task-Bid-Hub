import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllMessage } from '../../Redux/Action/MessageAction';
import { acceptTheBidder, getOtpForTask } from '../../Redux/Action/UserAction';
import '../Style/User-Task-Bid-Detail.css';

function TaskBidDetails() {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);
  const bids = selector?.bids || [];
  
  const [showOtpPopup, setShowOtpPopup] = useState(false); 
  const [otp, setOtp] = useState(null);

  const handleAccept = (bid) => {
    dispatch(acceptTheBidder(bid));
  };

  const handleMessage = (bid) => {
    dispatch(getAllMessage(bid._id));
    navi("/message", { state: bid });
  };

  const handleOtp = async (taskId) => {
    let result = await dispatch(getOtpForTask(taskId));
    setOtp(result); 
    setShowOtpPopup(true); 
  };

  const closeOtpPopup = () => setShowOtpPopup(false);

  return (
    <div className="task-bid-container">
      <h1 className="task-bid-title">Task Bid Details</h1>
      {selector && bids.length === 0 ? (
        <p className="no-bids">No bids available.</p>
      ) : (
        <ul className="bids-list">
          {bids.map((bid) => (
            <li key={bid._id} className="bid-item">
              <h2 className="bidder-id">Bidder ID: {bid.bidderId}</h2>
              <p className="bid-info"><strong>Amount:</strong> ${bid.amount}</p>
              <p className="bid-info"><strong>Description:</strong> {bid.description}</p>
              <p className="bid-info"><strong>Availability:</strong> {new Date(bid.availability).toLocaleDateString()}</p>
              <div className='item-btns'>

              <button onClick={() => handleAccept(bid)} className="action-button accept-button" disabled={bid.accepted}>
                {!bid?.accepted ? 'Accept' : 'Already Accepted'}
              </button>

              <button onClick={() => handleMessage(bid)} className="action-button message-button">
                Message
              </button>

              {bid.accepted && (
                <button onClick={() => handleOtp(bid.taskId)} className="action-button otp-button">
                  OTP
                </button>
              )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {showOtpPopup && (
        <div className="otp-popup-overlay">
          <div className="otp-popup">
            <h2>OTP For Task</h2>
            <p className="otp-code">{otp}</p>
            <button onClick={closeOtpPopup} className="close-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskBidDetails;
