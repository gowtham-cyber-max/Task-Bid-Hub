import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { completeTheTask } from '../../Redux/Action/UserAction';
import "../Style/User-Notify.css"
function Notification() {
    const selector = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const tasks = selector.task || []; // Ensure tasks is an array
    const navi = useNavigate();

    const HandleClick = (task) => {
        console.log(task);
        const data = {
            userId:task.userId,
            taskId: task._id,
            bidderId: task.allogatedTo
        };
        dispatch(completeTheTask(data));
    };

    return (
        <div className="notification-container">
            <h1 className="notification-title">Notification</h1>
            {tasks.length === 0 ? (
                <p className="empty-message">No notifications available.</p>
            ) : (
                <ul className="notification-list">
                    {tasks.map((task) => (
                        <div key={task._id} className="notification-card">
                            <h2 className="task-name">Task Name: {task.taskName}</h2>
                            <p className="task-description"><strong>Description:</strong> {task.taskDescription}</p>
                            <p className="task-budget"><strong>Budget:</strong> ${task.budget}</p>
                            <p className="task-dates"><strong>Posted Date:</strong> {new Date(task.postedDate).toLocaleDateString()}</p>
                            <p className="task-dates"><strong>End Date:</strong> {new Date(task.endDate).toLocaleDateString()}</p>
                            <p className="task-skills"><strong>Skills Required:</strong> {task.skills.join(', ')}</p>
                            <p className="task-location"><strong>Location:</strong> {task.location ? `Lat: ${task.location.coordinates[1]}, Lon: ${task.location.coordinates[0]}` : 'Not specified'}</p>
                            <p className="task-views"><strong>Views:</strong> {task.views}</p>
                            <p className="task-otp"><strong>OTP:</strong> {task.otp}</p>
                            <button className={`approve-button ${task.completedBy !== null ? "approved" : "pending"}`} onClick={() => HandleClick(task)} disabled={task.completedBy !== null}>
                                {task.completedBy !== null ? "Approved" : "Approve to complete"}
                            </button>
                            <p className="separator">-------</p>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Notification;
