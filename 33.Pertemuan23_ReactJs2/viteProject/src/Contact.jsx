import React from "react"
import Data from './data/contact.json'
import {Card} from "react-bootstrap"
import './contact.css'

function Contact(){
    return(
    <div className="row">
        {Data.map((Detail, index)=>{
            return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{Detail.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{Detail.email}</Card.Subtitle>
                    <Card.Text>{Detail.mobile}</Card.Text>
                </Card.Body>
            </Card>
            )
        })}
    </div>
    )
}

export default Contact