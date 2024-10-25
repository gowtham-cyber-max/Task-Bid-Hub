import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bidderLogin } from '../Redux/Action/BidderAction';
import './Style/Bidder-Login.css';
import { PiUserListFill } from 'react-icons/pi';
import { MdOutlinePassword } from 'react-icons/md';

function BidderLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bidder = useSelector(state => state.bidder?.bidder);
  const [data, setData] = useState({ email: '', password: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    if (data.email.length >= 4 && data.password.length >= 2) {
      dispatch(bidderLogin(data));
      if (bidder) navigate('/bidder-home');
    } else {
      alert('Invalid input: Username/Email must be at least 4 characters, and Password at least 2.');
    }
  };

  return (
    <div className='bidder-login'>

    <div className="bidder-login-container">
      <form onSubmit={onSubmit} className="bidder-login-form">
        <h1>Bidder Login</h1>

        <div className="bidder-login-input-box">
          <input
            type="text"
            placeholder="Email/Username"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <PiUserListFill className="bidder-login-icon" />
        </div>

        <div className="bidder-login-input-box">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <MdOutlinePassword className="bidder-login-icon" />
        </div>

        <button type="submit">Login</button>
      </form>

      <div className="bidder-login-register">
        <p onClick={() => navigate('/bidder-signup')}>
          Don't have an account? Register
        </p>
      </div>
    </div>
    </div>
  );
}

export default BidderLogin;
