import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBidForTask } from '../../Redux/Action/UserAction';

function MyTask() {
    const selector = useSelector((state) => state.user);
    const dispatch=useDispatch();
    const tasks = selector.task || []; // Ensure tasks is an array
    const navi=useNavigate();
    const HandleClick=(taskId)=>{
        navi("/user-task-bid-list")
        dispatch(getBidForTask(taskId));

    }
    return (
        <div>
            <h1>My Tasks</h1>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <div key={task._id} onClick={() => HandleClick(task._id)} style={{ margin: '10px 0', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                            <h2>Task Name: {task.taskName}</h2>
                            <p><strong>Description:</strong> {task.taskDescription}</p>
                            <p><strong>Budget:</strong> ${task.budget}</p>
                            <p><strong>Posted Date:</strong> {new Date(task.postedDate).toLocaleDateString()}</p>
                            <p><strong>End Date:</strong> {new Date(task.endDate).toLocaleDateString()}</p>
                            <p><strong>Skills Required:</strong> {task.skills.join(', ')}</p>
                            <p><strong>Location:</strong> {task.location ? `Lat: ${task.location.coordinates[1]}, Lon: ${task.location.coordinates[0]}` : 'Not specified'}</p>
                            <p><strong>Views:</strong> {task.views}</p>
                            <p><strong>OTP:</strong> {task.otp}</p>
                            
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default MyTask;
