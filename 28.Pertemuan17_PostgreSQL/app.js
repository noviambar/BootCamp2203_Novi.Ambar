//call express module
const express = require('express')
//call expressLayouts module
const expressLayouts = require('express-ejs-layouts')
//call express validator module
const {body,check, validationResult} = require('express-validator')
//call morgan
const morgan = require('morgan')
//call express library
const app = express()
//call contacts.js
const contacts = require('./contacts') 
//call body-parser module
const bp = require('body-parser')

const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(expressLayouts)

app.use(morgan('dev'))

//call database
const pool = require('./db')

app.use(express.json()) //=>req.body

//using middleware
app.use((req, res,next) => {
    console.log('Time:', Date.now())
    next()
})

//information using ejs
app.set('view engine','ejs')

//Menampilkan halaman home
app.get('/',(req,res)=>{
    const nama = "Novi Ambar Wati"
    const title = "Home Page"
    
    res.render('index',{nama, title})
})

app.use(express.static('public'))

//menampilkan halaman about
app.get('/About',(req,res)=>{
    const title = "About Page"
    cont =[]
    
    res.render('about',{title, cont})
})

//menampilkan halaman contact
app.get('/Contact',(req,res)=>{
   const listCont = pool.query(`SELECT * FROM contacts`, function(err,result){
        if(err){
            console.log(err)
            res.status(400).send(err)
        }
        res.render('contact',{title: "Contact Page", data: result.rows})
    })
})

//menampilkan halaman tambah data
app.get('/Add',(req,res)=>{
    const title = "Add Contact"
    
    res.render('add',{title})
})

//menambahkan data contact
app.post('/Contact', 
        body('name').custom(async (name,{req}) =>{
            try{
                const {rows: dupCont} = await pool.query(`SELECT name FROM contacts WHERE name='${name}'`)
                dupCont.map(contact => {
                    console.log(contact)
                    if (contact){
                        console.log('Contact name is already recorded. Use another contact name')
                        throw new Error('Name Already Taken')
                    }
                    return true
                })
            }catch(err){
                throw new Error('Name Already Taken')
            }
        }),
        check('email', 'Email is Invalid').isEmail(),
        check('mobile', 'Phone Number is Invalid').isMobilePhone('id-ID'),
    (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const data = [req.body]
        const alert = errors.array()
        res.render('add',{alert,data,title:"Add Data"})
    }else{
        const cont = [req.body.name, req.body.email, req.body.mobile]
        const addCont = pool.query(`INSERT INTO contacts (name, email, mobile) VALUES($1, $2, $3) RETURNING *`, cont, function(err,result){
        res.redirect("/Contact")
        })
    }
})

//menampilkan halaman detail berdasarkan nama
app.get('/Detail/:name',(req,res)=>{
    const detCont = pool.query(`SELECT * FROM contacts WHERE name = ('${req.params.name}')`,
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).send(err)
        }
        res.render('detail',{
            title: "Detail Page", 
            data: result.rows})
    })
})

//menghapus data berdasarkan nama
app.get('/Detail/Delete/:name',(req,res) =>{
    const delCont = pool.query(`DELETE FROM contacts WHERE name = ('${req.params.name}')`, 
    function(err,result){
        if(err){
            console.log(err)
            res.status(400).send(err)
        }
        res.redirect("/Contact")
    })
})

//menampilkan halaman edit data berdasarkan nama
app.get('/Detail/Edit/:name', (req,res)=>{
    const editCont = pool.query(`SELECT * FROM contacts WHERE name =('${req.params.name}')`, function(err,result){
        if(err){
            console.log(err)
            res.status(400).send(err)
        }
        res.render('update',{title: "Update Page", data: result.rows})
    })
})

//update data berdasarkan nama
app.post('/Detail/Edit/:name', 
    body('name').custom(async (name,{req}) =>{
        try{
            const {rows: dupCont} = await pool.query(`SELECT name FROM contacts WHERE name='${name}'`)
            dupCont.map(contact => {
                if (name !== req.body.oldName && contact.name){
                    console.log('Contact name is already recorded. Use another contact name')
                    throw new Error('Name Already Taken')
                }
                return true
            })
        }catch(err){
            console.log(err)
            throw new Error('Name Already Taken')
        }
    }),
    check('email', 'Email is Invalid').isEmail(),
    check('mobile', 'Phone Number is Invalid').isMobilePhone('id-ID'),
    (req,res)=>{
    const errors = validationResult(req)
    const data = [req.body]
    if(!errors.isEmpty()){
        const alert = errors.array()
        res.render('update',{alert, data,title:"Edit Data"})
    }else{
        const cont = [req.body.name, req.body.email, req.body.mobile]
        const upCont = pool.query(`UPDATE contacts SET name=$1, email=$2, mobile=$3 WHERE name=('${req.params.name}')`, cont, function(err,result){
            res.redirect("/Contact")
        })
    }
})

// app.get('/Product/:id', (req, res) => {
    
//     res.send('Product: ' + req.params.id + '<br></br>' + 'Category: ' + req.query.category)

// })

app.use('/',(req,res)=>{
    res.status(404).send('Page Not Found!: 404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})