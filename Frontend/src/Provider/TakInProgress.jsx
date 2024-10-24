import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Import Link for navigation

function TaskInProgress() {
  const navi=useNavigate();
  const selector = useSelector((state) => state.bidder);
  console.log(selector.bids)
  // Assuming bids are stored in `selector.bids`
  const bids = selector?.bids || []; 
  const HandleMessage=(bid)=>{
    navi("/message" ,{state:bid})
  }
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
              </div>
                 <button className="message-button" onClick={() =>HandleMessage(bid)}>Message</button>
              <p>---*---</p>
            </div>
          ))}
        </>
      ) : (
        <p>No bids available.</p>
      )}
    </div>
  );
}

export default TaskInProgress;
