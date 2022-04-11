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
app.get("/Addasync", async (req,res)=>{
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

//view data in database
app.get("/List", async (req,res)=>{
    try{
        const listCont = await pool.query(`SELECT * FROM contacts`)
        res.json(listCont.rows)
    }catch (err){
        console.log(err.message)
    }
})

//view detail data based on name
app.get("/Detail/:name", async (req,res)=>{
    try{
        const detCont = await pool.query(`SELECT * FROM contacts WHERE name = ('${req.params.name}')`)
        res.json(detCont.rows)
    }catch (err){
        console.log(err.message)
    }
})

//delete data based on name
app.get('/Delete/:name',async (req,res) =>{
    try{
        const deleteCont = await pool.query(`DELETE FROM contacts WHERE name = ('${req.params.name}')`)
        res.redirect('/List')
    }catch (err){
        console.log(err.message)
    }
})

//update data based on name
app.get('/Update/:name', async(req,res)=>{
    try{
        const name = "nov"
        const mobile = "089765432123"
        const email = "jl@gmail.com"
        const updateContact = await pool.query(`UPDATE contacts SET name='${name}', mobile='${mobile}', email='${email}' WHERE name = ('${req.params.name}')`)
        res.redirect('/List')
    }catch (err){
        console.log(err.message)
    }
})