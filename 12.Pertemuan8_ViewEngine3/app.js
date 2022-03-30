const express = require('express')
const app = express()
const port = 3000

//information using ejs
app.set('view engine','ejs')


app.get('/',(req,res)=>{
    const nama = "Novi Ambar Wati"
    const title = "Web Server EJS"
    cont =[]
    
    res.render('index',{nama, title, cont})
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/contact',(req,res)=>{
    res.render('contact')
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