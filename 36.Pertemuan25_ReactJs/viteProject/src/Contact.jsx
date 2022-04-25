import React, {useState, useEffect} from "react"
import axios from "axios"
import ListContact from './DataContact'
import './contact.css'

function Contact (){
  const [contacts, setContacts] = useState([])

  useEffect(()=>{
      //mengambil data
      axios.get("http://localhost:8000/contacts").then((res)=>{
        setContacts(res.data)
      })
    }, [])
  
  return(
    <div className="row">
      {contacts.map((contact)=>{
        return (
          <ListContact 
            id = {contact.id}
            key = {contact.id}
            name = {contact.name}
            email = {contact.email}
            mobile = {contact.mobile}
          />
        )
      })}
    </div>
  )
}

export default Contact