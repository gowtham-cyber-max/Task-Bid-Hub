import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addBidLog } from '../Redux/Action/BidderAction';

function TaskDetail() {
  const dispatch=useDispatch();
  const [visible, setVisible] = useState(false);
  const [LogData, setLogData] = useState({
    Amount: 0,
    Availability: "",
    Description: "",
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
    dispatch(addBidLog({...LogData,TaskId:task._id,UserId:task.userId}))
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
        <p>Bidder List: {task?.BidderList?.join(", ")}</p>
        <p>Task Id: {task?._id}</p>
        <p>Task Views: {task?.views}</p>
        <button onClick={HandleClick}>Bid For The Task</button>
      </div>
      
      {visible && (
        <div>
          <form onSubmit={HandleSubmit}>
            <div>
              <label>Amount</label>
              <input
                type="number"
                name="Amount"
                value={LogData.Amount}
                onChange={HandleChange}
                required
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                name="Description"
                value={LogData.Description}
                onChange={HandleChange}
                required
              />
            </div>
            <div>
              <label>Availability</label>
              <input
                type="date"
                name="Availability"
                value={LogData.Availability}
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
