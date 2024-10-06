import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector} from "react-redux";
import { userLogin } from '../../Redux/Action/UserAction';

function UserLogin() {
  const dispatch=useDispatch();
  const selector=useSelector(state=>state.user);
  const [data,setData]=useState({
    email:"",
    passWord:""
    })
  
    const navi=useNavigate();
    const onSubmiting=async(e)=>{
        e.preventDefault();
        dispatch(userLogin(data));
        if(selector?.user){
          navi('/user-home');
        }

    }
    const onSignUp=()=>{
      navi("/user-signup");
    }
  return (
    <div>
        <div>
        <form onSubmit={onSubmiting}>

        <input type='email' placeholder='email/userName' onChange={(e)=>{setData({...data,email:e.target.value})}}></input>
        <input type='pass' placeholder='password' onChange={(e)=>{setData({...data,passWord:e.target.value})}}></input>
            <button type='submit'>Login</button>
            <br/>
        </form>
            <button onClick={onSignUp}>signUp</button>

        </div>
    </div>
  )
}

export default UserLogin