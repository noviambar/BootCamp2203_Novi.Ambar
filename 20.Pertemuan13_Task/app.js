const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const { argv } = require('yargs')
const app = express()
const contacts = require('./contacts') 
const bp = require('body-parser')
const port = 3000

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(expressLayouts)

app.use(morgan('dev'))

//using middleware
app.use((req, res,next) => {
    console.log('Time:', Date.now())
    next()
})

//information using ejs
app.set('view engine','ejs')


app.get('/',(req,res)=>{
    const nama = "Novi Ambar Wati"
    const title = "Home Page"
    
    res.render('index',{nama, title})
})

app.use(express.static('public'))

app.get('/About',(req,res)=>{
    const title = "About Page"
    cont =[]
    
    res.render('about',{title, cont})
})

app.get('/Contact',(req,res)=>{
    const title = "Contact Page"
    const cont = contacts.loadContact()
    
    res.render('contact',{title, cont})
})

app.get('/Contact/Add',(req,res)=>{
    const title = "Add Contact"
    
    res.render('add',{title})
})

app.post('/Contact',(req,res)=>{
    const title = "Add New Contact"
    const contact = contacts.saveData(req.body.name, req.body.email, req.body.mobile)
    res.render('add', {title, contact})
})

app.get('/Detail/:name',(req,res)=>{
    const title = "Detail Page"
    const contact = contacts.findContact(req.params.name)
    console.log(contact)

    res.render('detail',{title, contact})
})

app.get('/Product/:id', (req, res) => {
    
    res.send('Product: ' + req.params.id + '<br></br>' + 'Category: ' + req.query.category)

})

app.use('/',(req,res)=>{
    res.status(404).send('Page Not Found!: 404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})