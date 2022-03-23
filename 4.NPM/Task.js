const readline = require('readline')
const validator = require('validator')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Siapa Nama Kamu?', (name) => {
    rl.question('Berapa Nomor kamu?', (nomor) =>{
        rl.question('Apa email kamu?', (email) => {
            console.log(`Nama Saya ${name}, Nomor Hp saya ${nomor}, Email Saya ${email}`)
            console.log(validator.isMobilePhone(`${nomor}`,'id-ID'), validator.isEmail(`${email}`))
            rl.close()
        })
    })
})