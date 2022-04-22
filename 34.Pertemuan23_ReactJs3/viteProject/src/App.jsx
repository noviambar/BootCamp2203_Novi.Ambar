import { useState } from 'react'
import {Button} from "react-bootstrap"
import { Toast } from 'react-bootstrap'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
  <Toast>
    <Toast.Header>
      <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
      <strong className="me-auto">Button Add</strong>
      <small>click button to change number</small>
    </Toast.Header>
    <Toast.Body>
      <Button variant="primary" onClick={()=>setCount((count)=> count + 1)}>Add</Button>{' '} 
      <Button variant="primary" onClick={()=>setCount((count)=> count - 1)}>Reducing</Button>{' '}
    </Toast.Body>
    <hr></hr>
    <Toast.Body>
      <p>Quantity: {count} </p>
    </Toast.Body>
  </Toast>
  )
}

export default App

