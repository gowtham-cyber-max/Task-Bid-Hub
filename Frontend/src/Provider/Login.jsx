import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { bidderLogin } from '../Redux/Action/BidderAction';

function BidderLogin() {
  const dispatch=useDispatch();
  const selector=useSelector(state=>state.bidder);
  const [data,setData]=useState({
    email:"",
    password:""
    })
  
    const navi=useNavigate();
    const onSubmiting=(e)=>{
      e.preventDefault();
      dispatch(bidderLogin(data));
      if(selector?.bidder){
        console.log(selector.bidder);
        navi("/bidder-home")
      }

    }
    const onSignUp=()=>{
      navi("/bidder-signup");
    }
  return (
    <div>
        <div>
        <form onSubmit={onSubmiting}>

        <input type='text' placeholder='email/userName' onChange={(e)=>{setData({...data,email:e.target.value})}}/>
        <input type='pass' placeholder='password' onChange={(e)=>{setData({...data,password:e.target.value})}}/>
            <button type='submit' >Login</button>
            <br/>
        </form>
            <button onClick={onSignUp}>signUp</button>

        </div>
    </div>
  )
}


export default BidderLogin