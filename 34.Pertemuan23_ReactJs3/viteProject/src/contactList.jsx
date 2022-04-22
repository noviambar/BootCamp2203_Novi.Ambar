import React, {useState, useEffect} from "react"
import {Card, Button} from "react-bootstrap"
import './contact.css'

const listContact =({contacts, setData, id, name, mobile})=>{
    const onDelete = async (id) =>{
        await fetch(`http://localhost:8000/contacts/${contacts.id}`, {
            method: 'DELETE'
        })
        .then((res)=>{
            if(res.status !== 200){
                return
            }else{
                setData(contacts.filter((contact)=> {
                    return contact.id !== id
                }))
            }
        })
        .catch((err) => {
            console.log(err)
        })
    } 

    const handleDelete = () =>{
        onDelete(id)
    }
    return(
        <div className="row">
            {contacts.map((contact)=>{
            return (
                <Card style={{ width: '18rem' }} key={contact.id}>
                    <Card.Body>
                        <Card.Title>{contact.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{contact.email}</Card.Subtitle>
                        <Card.Text>{contact.mobile}</Card.Text>
                        <Button variant="primary">Update</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </Card.Body>
                </Card>
            )
            })}
        </div>
    )
}

export default listContact