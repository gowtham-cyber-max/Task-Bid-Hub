import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addViewToTask } from '../Redux/Action/BidderAction';
import calculateDistance from '../Mutual/Components/DistanceCalculator';
import './Style/Bidder-Task-Explore.css';


function TaskExplore() {
  const dispatch = useDispatch();
  const navi = useNavigate();
  const selector = useSelector((state) => state.bidder);

  const handleClick = (task) => {
    if (task) {
      dispatch(addViewToTask(task._id));
      navi("/bidder-task-details", { state: task });
    }
  };

  return (
    <div className="task-explore-container">
      <h1 className="task-explore-title">Explore Tasks</h1>
      <p className="task-count">Available Tasks: {selector?.task_explore?.length}</p>
      <div className="task-list">
        {selector?.task_explore?.map((task, index) => (
          <div key={index} className="task-card" onClick={() => handleClick(task)}>
            <div className="task-info">
              <p><strong>Task Name:</strong> {task.taskName}</p>
              <p><strong>Description:</strong> {task.taskDescription}</p>
              <p><strong>Skills Required:</strong> {task.skills.join(', ')}</p>
              <p><strong>Budget:</strong> ${task.budget}</p>
              <p><strong>Location:</strong> {task.location?.coordinates?.join(", ")}</p>
              <p><strong>Distance:</strong> {calculateDistance(task.location?.coordinates[0], task.location?.coordinates[1], selector.bidder?.location?.coordinates[0], selector.bidder?.location?.coordinates[1])} km</p>
              <p><strong>Views:</strong> {task.views}</p>
              <p><strong>Posted Date:</strong> {new Date(task.postedDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(task.endDate).toLocaleDateString()}</p>
            </div>
            <div className="task-actions">
              <button className="view-details-button">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskExplore;
