import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllMessage } from '../../Redux/Action/MessageAction';
import { acceptTheBidder, getOtpForTask } from '../../Redux/Action/UserAction';

function TaskBidDetails() {
  const navi = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);
  const bids = selector?.bids || [];
  
  const [showOtpPopup, setShowOtpPopup] = useState(false); 
  const [otp, setOtp] = useState(null);

  console.log(bids);

  const handleAccept = (bid) => {
    dispatch(acceptTheBidder(bid));
  };

  const handleMessage = (bid) => {
    dispatch(getAllMessage(bid._id));
    navi("/message", { state: bid });
  };

  const handleOtp = async (taskId) => {
    if (!showOtpPopup) {
      let result = await dispatch(getOtpForTask(taskId)); // Wait for OTP result
      setOtp(result); 
      console.log(result)
    }
    setShowOtpPopup(!showOtpPopup); 
  };

  return (
    <div>
      <h1>Task Bid Details</h1>
      {selector && bids.length === 0 ? (
        <p>No bids available.</p>
      ) : (
        <ul>
          {bids.map((bid) => (
            <li
              key={bid._id}
              style={{
                margin: '10px 0',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <h2>Bidder ID: {bid.bidderId}</h2>
              <p>
                <strong>Amount:</strong> ${bid.amount}
              </p>
              <p>
                <strong>Description:</strong> {bid.description}
              </p>
              <p>
                <strong>Availability:</strong> {new Date(bid.availability).toLocaleDateString()}
              </p>

              <button
                onClick={() => handleAccept(bid)}
                style={{ marginRight: '10px', padding: '5px 10px' }}
                disabled={bid.accepted}
              >
                {!bid?.accepted ? 'Accept' : 'Already Accepted'}
              </button>

              <button
                onClick={() => handleMessage(bid)}
                style={{ padding: '5px 10px' }}
              >
                Message
              </button>

              {bid.accepted && !showOtpPopup && (
                <button onClick={() => handleOtp(bid.taskId)}>OTP</button>
              )}

              {showOtpPopup && otp && (
                <>
                  <h2>OTP For Task : {otp}</h2>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskBidDetails;
