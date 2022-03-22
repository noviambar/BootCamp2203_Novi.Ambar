const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question('Siapa Nama Kamu?', name=> {
    readline.question('Bagaimana Kabar Kamu Hari ini?', kabar=> {
        readline.question('Apakah kamu bahagia?', kondisi=>{
            console.log(`Nama Saya ${name}, Kabar saya hari ini ${kabar}, Hari ini Saya ${kondisi}`)
        } )
    })
})
