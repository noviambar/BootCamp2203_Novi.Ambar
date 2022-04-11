//call express module
const express = require('express')
//call express library
const app = express()
//call database
const pool = require('./db')

app.use(express.json()) //=>req.body

const port = 3000

//call server
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})

//insert data to database
app.get("/addasync", async (req,res)=>{
    try{
        const name = "nono"
        const mobile = "0812347658765"
        const email = "kl@gmail.com"
        const newCont = await pool.query(`INSERT INTO contacts VALUES ('${name}', '${mobile}', '${email}') RETURNING *`)
        res.json(newCont)
    }catch (err){
        console.log(err.message)
    }
})

app.get("/list", async (req,res)=>{
    try{
        const listCont = await pool.query(`SELECT * FROM contacts`)
        res.json(listCont.rows)
    }catch (err){
        console.log(err.message)
    }
})