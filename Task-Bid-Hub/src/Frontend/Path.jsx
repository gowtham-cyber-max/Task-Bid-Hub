import React from 'react'
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import {Route,Routes} from 'react-router-dom';

function Path() {
  return (
    <>
        <Routes>
        
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
        </Routes>
    </>
  )
}

export default Path