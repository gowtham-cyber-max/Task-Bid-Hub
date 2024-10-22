import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addBidLog } from '../Redux/Action/BidderAction';

function TaskDetail() {
  const dispatch=useDispatch();
  const [visible, setVisible] = useState(false);
  const [LogData, setLogData] = useState({
    amount: 0,
    availability: "",
    description: "",
  });

  const location = useLocation();
  const task = location.state; 

  const HandleClick = (e) => {
    e.preventDefault();
    setVisible(true);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    alert(JSON.stringify(LogData)); // JSON.stringify to show the object data in the alert
    dispatch(addBidLog({...LogData,taskId:task._id,userId:task.userId}))
    
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setLogData((prevLogData) => ({ ...prevLogData, [name]: value }));
  };

  return (
    <>
      <div>
        <h2>Task Details</h2>
        <p>Location: {task?.location?.coordinates?.join(", ")}</p>
        <p>Budget: {task?.budget}</p>
        <p>Image ID: {task?.imageIds}</p>
        <p>User ID: {task?.userId}</p>
        <p>Bidder List: {task?.bidderList?.join(", ")}</p>
        <p>Task Id: {task?._id}</p>
        <p>Task Views: {task?.views}</p>
        <p>Task Date: {task?.postedDate} h</p>
        <button onClick={HandleClick}>Bid For The Task</button>
      </div>
      
      {visible && (
        <div>
          <form onSubmit={HandleSubmit}>
            <div>
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={LogData.amount}
                onChange={HandleChange}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="description"
                value={LogData.description}
                onChange={HandleChange}
                required
              />
            </div>
            <div>
              <label>Availability</label>
              <input
                type="date"
                name="availability"
                value={LogData.availability}
                onChange={HandleChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
          <button onClick={() => setVisible(false)}>Close</button>
        </div>
      )}
    </>
  );
}

export default TaskDetail;
