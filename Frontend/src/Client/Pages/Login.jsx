import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from '../../Redux/Action/UserAction';
import '../Style/User-Login.css';

function UserLogin() {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.user);
  const [data, setData] = useState({ email: "", passWord: "" });
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (data.email.length >= 4 && data.passWord.length >= 2) {
      dispatch(userLogin(data));
      if (selector?.user) {
        console.log(selector.user);
        navigate('/user-home');
      }
    } else {
      setError("Invalid input: Username/Email must be at least 4 characters, and Password at least 2.");
    }
  };

  const onSignUp = () => {
    navigate("/user-signup");
  };

  return (
    <div className='user-login'>

    <div className="user-login-container">
      <h1 className="user-login-title">User Login</h1>
      <form onSubmit={onSubmit} className="user-login-form">
        <div className="user-login-input-box">
          <input
            type="text"
            className="user-login-input"
            placeholder="Email/Username"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="user-login-input-box">
          <input
            type="password"
            className="user-login-input"
            placeholder="Password"
            onChange={(e) => setData({ ...data, passWord: e.target.value })}
          />
        </div>
        {error && <p className="user-login-error">{error}</p>}
        <button type="submit" className="user-login-button">Login</button>
      </form>
      <button onClick={onSignUp} className="user-signup-button"> Don't have an account ? ,Sign Up</button>
    </div>
  </div>
  );
}

export default UserLogin;
