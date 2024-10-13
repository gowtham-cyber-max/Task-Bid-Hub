import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addViewToTask } from '../Redux/Action/BidderAction';

function TaskExplore() {
  const dispatch=useDispatch();
  const navi=useNavigate();
  const selector = useSelector(state => state.bidder);
  console.log("Tasks:", selector?.task_explore);  // Log task_explore for debugging
  const HandleClick=(task)=>{
    if(task){
      dispatch(addViewToTask(task._id));
      navi("/bidder-task-details" , {state:task})
    }
  }
  return (
    <div>
      TaskExplore: {selector?.task_explore?.length}
      {selector?.task_explore?.map((task, index) => (
        <div key={index} onClick={() => HandleClick(task)}>
          <p>Location: {task.location?.coordinates?.join(", ")}</p>
          <p>Budget: {task.budget}</p>
          <p>Image ID: {task.imageIds}</p>
          <p>User ID: {task.userId}</p>
          <p>Bidder List: {task.BidderList}</p>
          <p>Task Id: {task._id}</p>
          <p>Task Views: {task.views}</p>
          <p>----------------------------------***********-------------------------------</p>
        </div>
      ))}
    </div>
  );
}

export default TaskExplore;