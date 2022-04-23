import React, {useState, useEffect} from "react"
import axios from "axios"
import {Modal} from "react-bootstrap"
import {Card, Button, Form, Row, Col} from "react-bootstrap"
import './contact.css'

function Contact (){
  const [contacts, setContacts] = useState([])

  const[updates, setUpdates] = useState({id:null, status: false})

  const [formContact, setFormContact] = useState({
    name:"",
    email: "",
    mobile: "",
  })

  useEffect(()=>{
    //mengambil data
    axios.get("http://localhost:8000/contacts").then((res)=>{
      console.log(res.data)
      setContacts(res.data)
    })
  }, [])

  function handleChange(e){
    let data = {...formContact}
    data[e.target.name] = e.target.value
    setFormContact(data)
  }

  function handleUpdate(e){
    e.preventDefault()
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
          axios.put(`http://localhost:8000/contacts/${updates.id}`, {
            id: updates.id,
            name: formContact.name,
            email: formContact.email,
            mobile: formContact.mobile
          }).then((res)=>{
            console.log("Data Berhasil Di Update")
          })
        }
      })
    }else{
      let save = {
        id: id,
        name: formContact.name,
        email: formContact.email,
        mobile: formContact.mobile
      }
      data.push(save)
    }
  }

  function handleDelete(id){
    let data = [...contacts]
    let delData = data.filter((contact)=>contact.id !== id)

    //delete
    axios.delete("http://localhost:8000/contacts/" + id).then(()=>console.log("Data Terhapus"))
    setContacts(delData)
  }

  //Using Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    let data = [...contacts]
    let checkData = data.find((contact)=>contact.id === id)
    setUpdates({id: id, status: true})
    setFormContact({name: checkData.name, email: checkData.email, mobile: checkData.mobile})
    setShow(true)
  }

  return(
    <div className="row">
      {contacts.map((contact)=>{
        return (
        <Card style={{ width: '18rem' }} key={contact.id}>
          <Card.Body>
            <Row>
              <Col>
                <Card.Title>{contact.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{contact.email}</Card.Subtitle>
                <Card.Text>{contact.mobile}</Card.Text>
              </Col>
              <Col>
              <Form onSubmit={handleUpdate}>
                <Button variant="primary" onClick={()=>handleShow(contact.id)}>Update</Button>
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
                        defaultValue={formContact.email}
                      />
                      <Form.Label htmlFor="mobile">Mobile</Form.Label>
                      <Form.Control
                        type="text"
                        id="mobile"
                        name="mobile"
                        onChange={handleChange}
                        defaultValue={formContact.mobile}
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>Close</Button>
                      <Button variant="primary" onClick={handleUpdate}>Update</Button>{' '}
                    </Modal.Footer>
                  </ Modal>
                <hr></hr>
                <Button variant="danger" onClick={()=>handleDelete(contact.id)} getid={contact.id}>Delete</Button>
              </Form>
              </Col>
            </Row>
          </Card.Body>
      </Card>
      )
      })}
    </div>
  )
}

export default Contact