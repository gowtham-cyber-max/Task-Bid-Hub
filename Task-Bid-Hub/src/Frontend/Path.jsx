import React from 'react'
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import {Route,Routes} from 'react-router-dom';
import CsvInput from './CsvInput';

function Path() {
  return (
    <>
        <Routes>
        
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/' element={<Login/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/upload' element={<CsvInput/>}/>
            
        </Routes>
    </>
  )
}

export default Path