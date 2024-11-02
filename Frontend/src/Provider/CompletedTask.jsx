import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addViewToTask } from '../Redux/Action/BidderAction';
import './Style/Bidder-Task-Completed.css'; // Import the CSS file

function CompletedTask() {
  const dispatch = useDispatch();
  const navi = useNavigate();
  const selector = useSelector(state => state.bidder);
  console.log("Tasks:", selector?.task_explore);  // Log task_explore for debugging

  const HandleClick = (task) => {
    if (task) {
      dispatch(addViewToTask(task._id));
      navi("/bidder-task-details", { state: task });
    }
  };

  return (
    <div className="completed-task-container">
      <h2 className="completed-task-title">Completed Tasks</h2>
      <p className="completed-task-count">TaskExplore: {selector?.task_explore?.length}</p>
      {selector?.task_explore?.map((task, index) => (
        <div key={index} className="completed-task-item" onClick={() => HandleClick(task)}>
          <p>Location: {task.location?.coordinates?.join(", ")}</p>
          <p>Task Name: {task.taskName}</p>
          <p>Budget: {task.budget}</p>
          <p>Image ID: {task.imageIds}</p>
          <p>User ID: {task.userId}</p>
          <p>Bidder List: {task.bidderList.join(", ")}</p>
          <p>Task Id: {task._id}</p>
          <p>Task Views: {task.views}</p>
        </div>
      ))}
      <button onClick={() => navi("/some-route")}>Some Action</button>
    </div>
  );
}

export default CompletedTask;
