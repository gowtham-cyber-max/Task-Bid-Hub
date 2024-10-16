import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Still required for the input styles
import { useDispatch } from 'react-redux';
import { userLogin, userSinup } from '../../Redux/Action/UserAction';
import { useNavigate } from 'react-router-dom';

function UserSignUp() {
  const navi=useNavigate();
  const dispatch=useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    pass: ""
  });

  const submitting = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(userSinup(data));
    navi("/user-login");
    
  };

  return (
    <>
      <form onSubmit={submitting}>
      <input type='text' placeholder='userName' onChange={(e) => { setData({ ...data, name: e.target.value })}} />
       <input type='email' placeholder='email' onChange={(e)=>{setData({...data,email:e.target.value})}}  />
      <input type='pass' placeholder='password' onChange={(e)=>{setData({...data,pass:e.target.value})}}/>

          
          <PhoneInput
            value={data.mobile}
            onChange={(value) => setData({ ...data, mobile: value })}
            placeholder="Mobile Number"
          />
        
        <button type="submit">User Sign Up</button>
      </form>
    </>
  );
}

export default UserSignUp;
