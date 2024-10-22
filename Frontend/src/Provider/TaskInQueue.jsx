import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { otpValidationStartTheWorkRemoveFromQueue } from '../Redux/Action/BidderAction';

function TaskInQueue() {
    const navi = useNavigate();
    const dispatch=useDispatch();
    const selector = useSelector((state) => state.bidder);
    const bids = selector?.bids || [];

    const [showOtpPopup, setShowOtpPopup] = useState(false);
    const [selectedBid, setSelectedBid] = useState(null);
    const [otp, setOtp] = useState(Array(6).fill('')); // Array for 6 OTP digits

    

    const HandleMessage = (bid) => {
        navi("/message", { state: bid });
    };

    const handleStart = (bid) => {
        //store the bid for api call
        setSelectedBid(bid);
        setShowOtpPopup(true);
    };

    const handleOtpSubmit = async () => {
        // convert the char array into single number by parseInt base 10
        const otpCode = parseInt(otp.join(''), 10); 
        console.log(`OTP entered: ${otpCode} for bid ${selectedBid._id}`);

        const data={
            bidLogId:selectedBid._id,
            otp:otpCode,
            taskId:selectedBid.taskId,
            bidderId:selectedBid.bidderId
        }
        const res=await dispatch(otpValidationStartTheWorkRemoveFromQueue(data));
        if(res){
        setShowOtpPopup(false);
        setOtp(Array(6).fill(''));
        }
    };

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        if (/^\d$/.test(value)) { 
            newOtp[index] = value;
            setOtp(newOtp);
            if (index < 5 && value !== '') {
                document.getElementById(`otp-${index + 1}`)?.focus();
            }
        }
    };

    return (
        <div className="my-bids-container">
            <h1>My Bids</h1>
            {bids.length > 0 ? (
                <>
                    {bids.map((bid) => (
                        <div key={bid._id} className="bid-item">
                            <div className="bid-info">
                                <p><strong>Bid Amount:</strong> {bid.amount}</p>
                                <p><strong>Task ID:</strong> {bid.taskId}</p>
                                <p><strong>Bidder ID:</strong> {bid.bidderId}</p>
                                <p><strong>User ID:</strong> {bid.userId}</p>
                                <p><strong>Accepted:</strong> {bid.accepted ? 'Yes' : 'No'}</p>
                                <p><strong>Availability:</strong> {new Date(bid.availability).toLocaleDateString()}</p>
                                <p><strong>Description:</strong> {bid.description || 'N/A'}</p>
                                <p><strong>Start:</strong> {bid.start ? new Date(bid.start).toLocaleString() : 'Not set'}</p>
                                <p><strong>End:</strong> {bid.end ? new Date(bid.end).toLocaleString() : 'Not set'}</p>
                            </div>
                            <button className="message-button" onClick={() => HandleMessage(bid)}>Message</button>
                            {bid.start === null &&
                                <button className="start-button" onClick={() => handleStart(bid)}>Start</button>}
                            <hr />
                        </div>
                    ))}
                </>
            ) : (
                <p>No bids available.</p>
            )}

            {/* OTP Pop-up */}
            {showOtpPopup && (
                <div className="otp-popup">
                    <div className="otp-popup-content">
                        <h2>Enter OTP</h2>
                        <div className="otp-inputs">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e.target.value, index)}
                                    maxLength="1"
                                    className="otp-box"
                                />
                            ))}
                        </div>
                        <button onClick={handleOtpSubmit}>Submit</button>
                        <button onClick={() => setShowOtpPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskInQueue;
