import React from 'react'
import Home from './Provider/Home'
import Login from './Provider/Login'
import SignUp from './Provider/SignUp'
import {Route,Routes} from 'react-router-dom';
import CsvInput from './Provider/CsvInput';

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