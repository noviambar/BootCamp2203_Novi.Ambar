import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
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

