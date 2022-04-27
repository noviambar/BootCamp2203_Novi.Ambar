import React, {useState, useEffect} from "react"
import {Modal} from "react-bootstrap"
import axios from "axios"
import {Card, Button, Form, Row, Col} from "react-bootstrap"
import './contact.css'

function Contact(props){
    const [contacts, setContacts] = useState([])
    const [updates, setUpdates] = useState({id:null, status: false})
    const [show, setShow] = useState(false)
    const [formContact, setFormContact] = useState({
        name:"",
        email: "",
        mobile: "",
    })

    useEffect(()=>{
        //mengambil data
        axios.get("http://localhost:3001").then((res)=>{
          setContacts(res.data)
        })
      }, [])
    
    function handleChange(e){
        let data = {...formContact}
        data[e.target.name] = e.target.value
        setFormContact(data)
    }

    function handleUpdate(){

        let data = [...contacts]
    
        if(formContact.name === ""){
          return false
        }
        if(formContact.email === ""){
          return false
        }
        if(formContact.mobile === ""){
          return false
        }
    
        if(updates.status){
          data.forEach((contact)=>{
            if(contact.id === updates.id){
              axios.put(`http://localhost:3001/${updates.id}`, {
                id : updates.id,
                name: formContact.name,
                email: formContact.email,
                mobile: formContact.mobile
              }).then(()=>{
                console.log("Data Berhasil Di Update")
              })
            }
          })
        }
        setContacts(data)
        setUpdates(false)
        setFormContact({name: formContact.name , email: formContact.email, mobile: formContact.mobile})
      }
    
    function handleDelete(id){    
        //delete
        axios.delete(`http://localhost:3001/${id}`)
        .then(()=>{
          let data = [...contacts].filter(contact => contact.id !== id)
          setContacts(data)
        })
    }
  
    const handleShow = (id) => {
      let data = [...contacts]
        let checkData = data.find((contact)=>contact.id === id)
        setUpdates({id: id, status: true})
        setFormContact({name: checkData.name, email: checkData.email, mobile: checkData.mobile})
        setShow(true)
    }
    const handleClose = () => {
      setShow(false)
    }
    return(
        <Card style={{ width: '18rem' }} key={props.id}>
        <Card.Body>
            <Row>
                <Col>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.email}</Card.Subtitle>
                    <Card.Text>{props.mobile}</Card.Text>
                </Col>
                <Col>
                <Form onSubmit={handleUpdate}>
                    <Button variant="primary" onClick={()=>handleShow(props.id)}>Update</Button>
                    <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    >
                    <Modal.Header closeButton>
                        <Modal.Title>Update Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label htmlFor="">Name</Form.Label>
                        <Form.Control 
                        type="text"
                        onChange={handleChange}
                        value={formContact.name}
                        className="form-control"
                        name="name"
                        />
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        value={formContact.email}
                        />
                        <Form.Label htmlFor="mobile">Mobile</Form.Label>
                        <Form.Control
                        type="text"
                        id="mobile"
                        name="mobile"
                        onChange={handleChange}
                        value={formContact.mobile}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={()=>handleUpdate(props.id)} type="submit">Update</Button>
                    </Modal.Footer>
                    </ Modal>
                    <hr></hr>
                <Button variant="danger" onClick={()=>handleDelete(props.id)}>Delete</Button>
                </Form>
                </Col>
            </Row>
        </Card.Body>
    </Card>
      )
  }

export default Contact