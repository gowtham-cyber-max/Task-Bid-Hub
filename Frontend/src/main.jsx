import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Path from './Path'
import { HashRouter } from 'react-router-dom'
import {createStoreHook,Provider} from 'react-redux'
import store from "./Redux/Store"

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}>

      <HashRouter>
          <Path/>
      </HashRouter>

   </Provider>
)
