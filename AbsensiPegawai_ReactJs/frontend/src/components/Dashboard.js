import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ListUser from "./user";
import Navbar from "./Navbar";

function Contact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    //mengambil data
    axios.get("http://localhost:3001/Dashboard").then((res) => {
      setContacts(res.data);
    });
  }, []);
  // let navigate = useNavigate()

  // useEffect(()=>{
  //   const token = localStorage.getItem('token')
  //   axios.get("http://localhost:3001/Dashboard", {
  //     // headers: {
  //     //   Authorization: token,
  //     // }
  //   }).then(res =>{
  //     console.log(res)
  //   }).catch(err => {
  //     console.log(err)
  //     navigate('/')
  //   })
  // }, [])

  return (
    <div className="row">
      <Navbar />
      {contacts.map((contact) => {
        return (
          <ListUser
            id={contact.id}
            key={contact.id}
            name={contact.name}
            position={contact.position}
            email={contact.email}
            mobile={contact.mobile}
            address={contact.address}
            password={contact.password}
            image={contact.image}
          />
        );
      })}
    </div>
  );
}

export default Contact;
