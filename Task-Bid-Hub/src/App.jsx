import React, { useEffect, useState } from 'react'

function App() {

  const [backData,updatebackdata]=useState([{}]) // list of json

  useEffect(()=>{
    fetch('http://localhost:5000/api').then(
       (response) => response.json() 
      ).then(
        (data) => {updatebackdata(data.users)
        } 

      )
    },[])
  
  return (
    <div>
    <h1>My App</h1>
    <ul>
      {backData.map((item,index)=>{
        console.log(backData)
        return <li key={index}>{item.name}</li>
        })}

    </ul>
    </div>
  )
}

export default App