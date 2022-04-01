const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

app.use(expressLayouts)

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
    cont =[]
    
    res.render('index',{nama, title, cont})
})

app.use(express.static("public"))
app.get('/about',(req,res)=>{
    const title= "About Page"
    cont =[]
    res.render('about',{title, cont})
})


app.get('/contact',(req,res)=>{
    const title = "Contact Page"
    cont =[]
    
    res.render('contact',{title, cont})
})

app.get('/',(req,res)=>{
    res.sendFile('./index.html',{root: __dirname})
})

app.get('/about', (req, res) => {
    res.sendFile('./about.html',{root: __dirname})
})

app.get('/contact', (req, res) => {
    res.sendFile('./contact.html',{root: __dirname})
})

// app.get('/product/:id', (req, res) => {
//     res.send('Product: ' + req.params.id)
// })

app.get('/product/:id', (req, res) => {
    
    res.send('Product: ' + req.params.id + '<br></br>' + 'Category: ' + req.query.category)

})

app.use('/',(req,res)=>{
    res.status(404).send('Page Not Found!: 404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})