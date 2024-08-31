import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [data,setData]=useState({
    email:"",
    passWord:""
    })
  
    const navi=useNavigate();
    const onSubmiting=async()=>{
      await axios.post("http://localhost:5000/login",{data}).then(
        (res)=>{
          console.log(data);
          console.log(res.data);
          if(res.data==="success"){
            navi("/home");
          }
          else if(res.data==="fail"){
            alert("Password Wrong")
          }
          else if(res.data==="not exist"){
            alert("Email Not Found")
            }
        }
      )
    }
    const onSignUp=()=>{
      navi("/signup");
    }
  return (
    <div>
        <div>
        <input type='email' placeholder='email/userName' onChange={(e)=>{setData({...data,email:e.target.value})}}></input>
        <input type='pass' placeholder='password' onChange={(e)=>{setData({...data,passWord:e.target.value})}}></input>
            <button type='submit' onClick={onSubmiting}>Login</button>
            <br/>
            <button onClick={onSignUp}>signUp</button>

        </div>
    </div>
  )
}

export default Login