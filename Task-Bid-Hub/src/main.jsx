import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Path from './Frontend/Path.jsx'
import { HashRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
   <HashRouter>
    <Path/>
  </HashRouter>
)
