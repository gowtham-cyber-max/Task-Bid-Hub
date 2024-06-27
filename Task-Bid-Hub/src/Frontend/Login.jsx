import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [data,setData]=useState({
    email: '',
    password: ''
    })
  
    const navi=useNavigate();
    const onSubmiting=()=>{
      axios.post("http://localhost:5000/newuser/register",{data})
        navi("/home");
    }
  return (
    <div>
        <div>
            <input placeholder='email/username' onClick={(e)=>{setData({...data,email:e.target.value})}}></input>
            <input placeholder='Password' onClick={(e)=>{setData({...data,password:e.target.value})}} ></input>
            <button type='submit' onClick={onSubmiting
            }>Login</button>
            <button onClick={onSubmiting}>signUp</button>

        </div>
    </div>
  )
}

export default Login