const readline = require('readline')
const validator = require('validator')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Siapa Nama Kamu?', (name) => {
    rl.question('Berapa Nomor kamu?', (nomor) =>{
        console.log(validator.isMobilePhone(`${nomor}`, 'id-ID'))
        if (validator.isMobilePhone(`${nomor}`, 'id-ID')){
            rl.question('Apa email kamu?', (email) => {
                console.log(` Email Saya ${email}`)
                console.log(validator.isEmail(`${email}` ))
                rl.close()
            })        
        }else{
            rl.close()
        }
    })
})


 