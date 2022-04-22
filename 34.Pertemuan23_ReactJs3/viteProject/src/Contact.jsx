import React, {useState, useEffect} from "react"
import ListContact from "./contactList"
import './contact.css'

const Contact = () =>{
    const [contacts, setData] = useState(null)

    const onDelete = async (id) =>{
        await fetch(`http://localhost:8000/contacts/${id}`, {
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

    useEffect(()=>{
        fetch('http://localhost:8000/contacts')
        .then(res =>{
            return res.json()
        })
        .then((data)=>{
            console.log(data )
            setData(data)
        })
    }, [])
    return(
    <div className="contact">
        {contacts && <ListContact contacts={contacts}/>}
    </div>
    )
}

export default Contact