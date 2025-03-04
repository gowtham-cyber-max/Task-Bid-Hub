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
      <p className="completed-task-count">Total Tasks: {selector?.task_explore?.length}</p>
      {selector?.task_explore?.map((task, index) => (
        <div key={index} className="completed-task-item" onClick={() => HandleClick(task)}>
          <div className="task-details-row">
            <span className="task-details-question">Location:</span>
            <span className="task-details-answer">{task.location?.coordinates?.join(", ")}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-question">Task Name:</span>
            <span className="task-details-answer">{task.taskName}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-question">Task Description:</span>
            <span className="task-details-answer">{task.taskDescription}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-question">Task Completed By:</span>
            <span className="task-details-answer">{task.completedBy}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-question">Task Allogated To:</span>
            <span className="task-details-answer">{task.allogatedTo}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-question">Budget:</span>
            <span className="task-details-answer">{task.budget}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-question">Image ID:</span>
            <span className="task-details-answer">{task.imageIds}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-question">User ID:</span>
            <span className="task-details-answer">{task.userId}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-question">Bidder List:</span>
            <span className="task-details-answer">{task.bidderList.join(", ")}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-question">Task ID:</span>
            <span className="task-details-answer">{task._id}</span>
          </div>
          <div className="task-details-row">
            <span className="task-details-question">Task Views:</span>
            <span className="task-details-answer">{task.views}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CompletedTask;
