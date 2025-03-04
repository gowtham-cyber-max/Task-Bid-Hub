import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [backData,updatebackdata]=useState([]) // list of json
  const [name,setName]=useState("");

  const Submiting=async ()=>{
    fetch('http://localhost:5000/api1')
    .then(
      (response) => response.json()
    )
    .then(
      (s)=>{console.log(s)}
    )
  }
  
  return (
    <div>
    <h1>My App</h1>
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
    <button onClick={Submiting}>button</button>
    
  </div>)
}

export default App