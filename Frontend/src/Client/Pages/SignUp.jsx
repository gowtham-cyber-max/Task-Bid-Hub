import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css'; // Required for the phone input styles
import { useDispatch } from 'react-redux';
import { userSinup } from '../../Redux/Action/UserAction';
import { useNavigate } from 'react-router-dom';
import "../Style/User-Signup.css";

function UserSignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    pass: ""
  });

  const submitting =async (e) => {
    e.preventDefault();
    const res =await dispatch(userSinup(data));
    if(res){
      navigate("/user-login");

    }
    else{
      alert("error in sign up")
    }
  };

  return (
    <div className="user-signup-container">
      <h2 className="user-signup-title">User Signup</h2>
      <form onSubmit={submitting} className="user-signup-form">
        <input 
          type="text" 
          placeholder="Username" 
          onChange={(e) => setData({ ...data, name: e.target.value })}
          className="user-signup-input"
        />
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="user-signup-input"
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setData({ ...data, pass: e.target.value })}
          className="user-signup-input"
        />
        <PhoneInput
          value={data.mobile}
          onChange={(value) => setData({ ...data, mobile: value })}
          placeholder="Mobile Number"
          className="user-signup-phone-input"
        />
        <button type="submit" className="user-signup-button">User Sign Up</button>
      </form>
    </div>
  );
}

export default UserSignUp;
