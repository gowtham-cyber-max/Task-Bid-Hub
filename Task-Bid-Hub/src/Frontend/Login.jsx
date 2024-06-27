import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navi=useNavigate();
    const onSubmiting=()=>{
        navi("/home");
    }
  return (
    <div>
        <div>
            <input placeholder='email/username'></input>
            <input placeholder='Password'></input>
            <button type='submit' onClick={onSubmiting}>Login</button>
            <button onClick={()=>{navi("/signup")}}>signUp</button>

        </div>
    </div>
  )
}

export default Login