import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Style/Bidder-MyBids.css"

function MyBids() {
  const navi = useNavigate();
  const selector = useSelector((state) => state.bidder);
  const bids = selector?.bids || []; 

  const handleMessage = (bid) => {
    navi("/message", { state: bid });
  };

  return (
    <div className="my-bids-container">
      <h1 className="my-bids-title">My Bids</h1>
      {bids.length > 0 ? (
        <div className="my-bids-list">
          {bids.map((bid) => (
            <div key={bid._id} className="my-bids-item">
              <div className="my-bids-info">
                <p className="my-bids-detail"><strong>Bid Amount:</strong> {bid.amount}</p>
                <p className="my-bids-detail"><strong>Description:</strong> {bid.description}</p>
                <p className="my-bids-detail"><strong>Task ID:</strong> {bid.taskId}</p>
                <p className="my-bids-detail"><strong>User ID:</strong> {bid.userId}</p>
              </div>
              <button className="my-bids-message-button" onClick={() => handleMessage(bid)}>Message</button>
            </div>
          ))}
        </div>
      ) : (
        <p className="my-bids-no-bids-message">No bids available.</p>
      )}
    </div>
  );
}

export default MyBids;
