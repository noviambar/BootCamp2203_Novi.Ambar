// // core module
// //file system
// const fs = require('fs')


// //menambahkan file dan menulis secara synchronous
// fs.readFile('test.txt','utf-8',(err,data)=>{
//     if (err) throw err
//     console.log(data)
// })

const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Siapa Nama Kamu?', (name) => {
    rl.question('Berapa Nomor kamu?', (nomor) =>{
        rl.question('Apa email kamu?', (email) => {
            console.log(`Nama Saya ${name}, Nomor Hp saya ${nomor}, Email Saya ${email}`)

            rl.close()
        })
    })
})

