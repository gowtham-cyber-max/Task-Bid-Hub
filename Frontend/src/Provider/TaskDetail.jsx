import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addBidLog } from '../Redux/Action/BidderAction';
import "./Style/Bidder-Task-Detail.css"

function TaskDetail() {
  const dispatch = useDispatch();
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
    dispatch(addBidLog({...LogData, taskId: task._id, userId: task.userId}))
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setLogData((prevLogData) => ({ ...prevLogData, [name]: value }));
  };

  return (
    <>
      <div className="task-detail-container">
        <h2 className="task-detail-title">Task Details</h2>
        <p className="task-detail-info">Location: {task?.location?.coordinates?.join(", ")}</p>
        <p className="task-detail-info">Budget: {task?.budget}</p>
        <p className="task-detail-info">Image ID: {task?.imageIds}</p>
        <p className="task-detail-info">User ID: {task?.userId}</p>
        <p className="task-detail-info">Bidder List: {task?.bidderList?.join(", ")}</p>
        <p className="task-detail-info">Task Id: {task?._id}</p>
        <p className="task-detail-info">Task Views: {task?.views}</p>
        <p className="task-detail-info">Task Date: {task?.postedDate} h</p>
        <button className="task-detail-bid-button" onClick={HandleClick}>Bid For The Task</button>
      </div>
      
      {visible && (
        <div className="task-detail-form-container">
          <form className="task-detail-form" onSubmit={HandleSubmit}>
            <div className="task-detail-form-group">
              <label className="task-detail-form-label">Amount</label>
              <input
                className="task-detail-form-input"
                type="number"
                name="amount"
                value={LogData.amount}
                onChange={HandleChange}
                required
              />
            </div>
            <div className="task-detail-form-group">
              <label className="task-detail-form-label">Description</label>
              <textarea
                className="task-detail-form-textarea"
                name="description"
                value={LogData.description}
                onChange={HandleChange}
                required
              />
            </div>
            <div className="task-detail-form-group">
              <label className="task-detail-form-label">Availability</label>
              <input
                className="task-detail-form-input"
                type="date"
                name="availability"
                value={LogData.availability}
                onChange={HandleChange}
                required
              />
            </div>
            <button className="task-detail-submit-button" type="submit">Submit</button>
          </form>
          <button className="task-detail-close-button" onClick={() => setVisible(false)}>Close</button>
        </div>
      )}
    </>
  );
}

export default TaskDetail;
