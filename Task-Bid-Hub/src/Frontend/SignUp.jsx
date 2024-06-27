import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [data,setData]=useState({
        userName:"",
        pass:"",
        email:""
    })
    const navi=useNavigate();

    const onSubmiting=async (event)=>{
        console.log(data);
        axios.post('http://localhost:5000/newuser/register',{data}).then((res=>{
            console.log(res.data);
        })).catch(er=>console.log(er))
        
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