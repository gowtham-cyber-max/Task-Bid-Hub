import React from 'react';
import { useLocation } from 'react-router-dom';

function TaskDetail() {
  const location = useLocation();
  const task = location.state; 
  console.log(task); 
    const HandleClick=()=>{
        
    }
  return (
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
  );
}

export default TaskDetail;
