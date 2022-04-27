import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"
import App from './App'
import ListContact from './Contact'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import NavbarComp from './nav'

ReactDOM.createRoot(document.getElementById('nav')).render(
  <React.StrictMode>
    <NavbarComp />
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('contact')).render(
  <React.StrictMode>
    <ListContact />
  </React.StrictMode>
)

