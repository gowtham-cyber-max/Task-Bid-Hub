import React, { useEffect, useState } from 'react'

function App() {

  const [backData,updatebackdata]=useState([{}]) // list of json

  useEffect(()=>{
    fetch('http://localhost:5000/api').then(
       (response) => response.json() 
      ).then(
        (data) => {updatebackdata(data)
        }

      )
    },[])
  
  return (
    <div>
    <h1> Welcome to my app</h1>
    <ul>
      {backData.map((item,index)=>{
        return <li key={index}>{item.name}</li>
        })}
    </ul>
    </div>
  )
}

export default App