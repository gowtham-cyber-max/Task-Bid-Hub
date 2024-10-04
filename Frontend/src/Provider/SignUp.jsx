import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [data,setData]=useState({
        user:"",
        pass:"",
        email:""
    })
    const navi=useNavigate();

    const onSubmiting=async (event)=>{
        console.log(data);
        
    }
  return (
    <div>
        <div>
            <input type='text' placeholder='Username' onChange={(e)=>{setData({...data,userName:e.target.value})}}></input>
            <input type='email' placeholder='email' onChange={(e)=>{setData({...data,email:e.target.value})}}></input>
            <input type='pass' placeholder='password' onChange={(e)=>{setData({...data,pass:e.target.value})}}></input>
            <button type='submit' onClick={onSubmiting}>Submit</button>
            
        </div>
    </div>
  )
}

export default SignUp;