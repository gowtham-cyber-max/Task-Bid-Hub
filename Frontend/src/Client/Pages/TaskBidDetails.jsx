import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllMessage } from '../../Redux/Action/MessageAction';

function TaskBidDetails() {
  const navi=useNavigate();
  const dispatch=useDispatch();
    const selector = useSelector((state) => state.user);
    const bids = selector?.bids || []; 
    console.log(bids);

    const handleAccept = (bidId) => {
      alert("accepted bid with ID:"+ bidId);
      
    };
    
    const handleMessage = (bid) => {
        dispatch(getAllMessage(bid._id));
      navi("/user-message" ,{state:bid})
        
    };

    return (
        <div>
            <h1>Task Bid Details</h1>
            {selector && bids.length === 0 ? (
                <p>No bids available.</p>
            ) : (
                <ul>
                    {bids.map((bid) => (
                        <li key={bid._id} style={{ margin: '10px 0', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                            <h2>Bidder ID: {bid.BidderId}</h2>
                            <p><strong>Amount:</strong> ${bid.Amount}</p>
                            <p><strong>Description:</strong> {bid.Description}</p>
                            <p><strong>Availability:</strong> {new Date(bid.Availability).toLocaleDateString()}</p>

                            <button onClick={() => handleAccept(bid._id)} style={{ marginRight: '10px', padding: '5px 10px' }}>
                                Accept
                            </button>
                            <button onClick={() => handleMessage(bid)} style={{ padding: '5px 10px' }}>
                                Message
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TaskBidDetails;
