import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBidForTask } from '../../Redux/Action/UserAction';
import '../Style/User-MyTask.css'

function MyTask() {
    const selector = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const tasks = selector.task || []; // Ensure tasks is an array
    const navi = useNavigate();

    const handleClick = (taskId) => {
        navi("/user-task-bid-list");
        dispatch(getBidForTask(taskId));
    };

    return (
        <div className="my-task-container">
            <h1 className="my-task-title">My Tasks</h1>
            {tasks.length === 0 ? (
                <p className="my-task-empty">No tasks available.</p>
            ) : (
                <ul className="my-task-list">
                    {tasks.map((task) => (
                        <div 
                            key={task._id} 
                            onClick={() => handleClick(task._id)} 
                            className="my-task-card"
                        >
                            <h2 className="task-name">Task Name: {task.taskName}</h2>
                            <p className="task-info"><strong>Description:</strong> {task.taskDescription}</p>
                            <p className="task-info"><strong>Budget:</strong> ${task.budget}</p>
                            <p className="task-info"><strong>Posted Date:</strong> {new Date(task.postedDate).toLocaleDateString()}</p>
                            <p className="task-info"><strong>End Date:</strong> {new Date(task.endDate).toLocaleDateString()}</p>
                            <p className="task-info"><strong>Skills Required:</strong> {task.skills.join(', ')}</p>
                            <p className="task-info"><strong>Location:</strong> {task.location ? `Lat: ${task.location.coordinates[1]}, Lon: ${task.location.coordinates[0]}` : 'Not specified'}</p>
                            <p className="task-info"><strong>Views:</strong> {task.views}</p>
                            <p className="task-info"><strong>OTP:</strong> {task.otp}</p>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyTask;
