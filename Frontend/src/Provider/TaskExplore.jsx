import React from 'react'
import { useSelector } from 'react-redux'

function TaskExplore() {
    const selector = useSelector(state => state.bidder);
console.log("hello------------>"+selector?.task_explore); 
  return (
    <div>TaskExplore</div>
  )
}

export default TaskExplore