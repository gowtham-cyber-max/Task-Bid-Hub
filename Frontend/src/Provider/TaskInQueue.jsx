import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { otpValidationStartTheWorkRemoveFromQueue, sendCompleteRequest } from '../Redux/Action/BidderAction';
import "./Style/Bidder-Queue.css";

function TaskInQueue() {
    const navi = useNavigate();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.bidder);
    const bids = selector?.bids || [];

    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [selectedBid, setSelectedBid] = useState(null);
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [otpSubmitted, setOtpSubmitted] = useState(false);

    const otpRefs = useRef([...Array(6)].map(() => React.createRef()));

    const handleMessage = (bid) => {
        navi("/message", { state: bid });
    };

    const handleStart = (bid) => {
        setSelectedBid(bid);
        setShowOtpPopup(true);
    };

    const handleOtpSubmit = async () => {
        const otpCode = parseInt(otp.join(''), 10);
        const data = {
            bidLogId: selectedBid._id,
            otp: otpCode,
            taskId: selectedBid.taskId,
            bidderId: selectedBid.bidderId
        };
        const res = await dispatch(otpValidationStartTheWorkRemoveFromQueue(data));
        if (res) {
            setOtpSubmitted(true);
            setTimeout(() => {
                setShowOtpPopup(false);
                setOtp(Array(6).fill(''));
                setOtpSubmitted(false);
            }, 2000);
        }
    };

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        if (value === '') {
            newOtp[index] = '';
            setOtp(newOtp);
            if (index > 0) otpRefs.current[index - 1].current.focus();
        } else if (/^\d$/.test(value)) {
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < 5) otpRefs.current[index + 1].current.focus();
        }
    };

    const handleEnd = async (bid) => {
        const data = {
            bidLogId: bid._id,
            taskId: bid.taskId,
            bidderId: bid.bidderId
        };
        await dispatch(sendCompleteRequest(data));
    };

    return (
        <div className="task-in-queue-container">
            <h1 className="task-in-queue-header">Queue</h1>
            {bids.length > 0 ? (
                bids.map((bid) => (
                    <div key={bid._id} className="task-in-queue-bid-item">
                        <div className="task-in-queue-bid-info">
                            <p><strong>Bid Amount:</strong> {bid.amount}</p>
                            <p><strong>Task ID:</strong> {bid.taskId}</p>
                            <p><strong>Accepted:</strong> {bid.accepted ? 'Yes' : 'No'}</p>
                            <p><strong>Availability:</strong> {new Date(bid.availability).toLocaleDateString()}</p>
                        </div>
                        <button className="task-in-queue-message-button" onClick={() => handleMessage(bid)}>Message</button>
                        {bid.start === null ? (
                            <button className="task-in-queue-start-button" onClick={() => handleStart(bid)}>Start</button>
                        ) : (
                            <button className="task-in-queue-end-button" onClick={() => handleEnd(bid)}>End</button>
                        )}
                    </div>
                ))
            ) : (
                <p className="task-in-queue-no-bids">No bids available.</p>
            )}

            {showOtpPopup && (
                <div className="task-in-queue-otp-popup">
                    <div className="task-in-queue-otp-popup-content">
                        <h2>Enter OTP</h2>
                        <div className="task-in-queue-otp-inputs">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => otpRefs.current[index] = el}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e.target.value, index)}
                                    maxLength="1"
                                    className="task-in-queue-otp-box"
                                />
                            ))}
                        </div>
                        <button 
                            className={`task-in-queue-otp-submit-button ${otpSubmitted ? 'submitted' : ''}`} 
                            onClick={handleOtpSubmit}
                        >
                            Submit
                        </button>
                        <button className="task-in-queue-otp-cancel-button" onClick={() => setShowOtpPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskInQueue;
