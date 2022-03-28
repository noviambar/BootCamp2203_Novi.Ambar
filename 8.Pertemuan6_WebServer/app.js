const http = require('http')
const port = 3000
const fs = require('fs')

http
    .createServer((req,res)=>{
    const url = req.url
    console.log(url)
    res.writeHead(200,{
        'Content-Type': 'text/html',
    })

    function path(filename){
            fs.readFile(filename,(err,data)=>{        //Membaca dari file html
                if(err){
                    res.writeHead(404)
                    res.write('Error: Page not found')
                }else{
                    res.write(data)
                }
                res.end()
            })

    }

    if(url ==='/about'){
        //res.write('<h1>This is About page</h1>') //using html language
        path('./about.html')
        
    }else if(url ==='/contact'){
        //res.write('<h2>This is Contact page</h2>')     //using html language
        path('./contact.html')      
        
    }else{
        //res.write('Hello World!')
        path('./index.html')
        
    }

    })
    .listen(3000,()=>{
        console.log('Server is listening on port 3000')
    })

    