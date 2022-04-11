const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const {body,check, validationResult} = require('express-validator')
const morgan = require('morgan')
const { argv, array } = require('yargs')
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
    const title = "About Page"
    const cont= contacts.loadContact()
    const contact = contacts.findContact(req.params.name)
    
    res.render('contact',{title, cont,contact})
})

app.get('/Add',(req,res)=>{
    const title = "Add Contact"
    
    res.render('add',{title})
})

app.post('/Contact', 
        body('name').custom(name =>{
            const duplicate = contacts.findName(name)
            console.log("1")
            if (duplicate){
                console.log('Contact name is already recorded. Use another contact name')
                throw new Error('Name Already Taken')
            }
            return true
        }),
        check('email', 'Email is Invalid').isEmail(),
        check('mobile', 'Phone Number is Invalid').isMobilePhone('id-ID'),
    (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const alert = errors.array()
        res.render('add',{alert,title:"Add Data"})
    }else{
        contacts.saveData(req.body)
        res.redirect('/Contact')
    }
})

app.get('/Detail/:name',(req,res)=>{
    const title = "Detail Page"
    const contact = contacts.findContact(req.params.name)
    console.log(contact)

    res.render('detail',{title,contact})
})

app.get('/Detail/Delete/:name',(req,res) =>{
    contacts.deleteContact(req.params.name)
    res.redirect('/Contact')
})

app.get('/Detail/Edit/:name', (req,res)=>{
    const title = "Edit Data"
    const contact = contacts.findContact(req.params.name)
    //console.log('1',contact)
    res.render('update',{title, contact})
})

app.post('/Detail/Edit/:name', 
    body('name').custom((name,{req}) =>{
        const duplicate = contacts.findName(name)
        if (name!==req.body.oldName && duplicate){
            console.log('Contact name is already recorded. Use another contact name')
            throw new Error('Name Already Taken')
        }
        return true
    }),
    check('email', 'Email is Invalid').isEmail(),
    check('mobile', 'Phone Number is Invalid').isMobilePhone('id-ID'),
    (req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const alert = errors.array()
        res.render('update',{alert,contact:req.body, title:"Edit Data"})
    }else{
        contacts.updateContact(req.body)
        res.redirect('/Contact')
    }
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