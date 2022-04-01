const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000

app.use(expressLayouts)

app.use(express.static('public'))

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

app.get('/About',(req,res)=>{
    const title = "About Page"
    cont =[]
    
    res.render('about',{title, cont})
})

app.use(express.static('public'))

app.get('/Contact',(req,res)=>{
    const title = "Contact Page"
    cont =[]
    
    res.render('contact',{title, cont})
})

app.get('/product/:id', (req, res) => {
    
    res.send('Product: ' + req.params.id + '<br></br>' + 'Category: ' + req.query.category)

})

app.use('/',(req,res)=>{
    res.status(404).send('Page Not Found!: 404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})