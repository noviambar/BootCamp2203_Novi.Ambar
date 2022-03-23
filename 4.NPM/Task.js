const { Console } = require('console')
const readline = require('readline')
const validator = require('validator')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Siapa Nama Kamu?', (name) => {
    rl.question('Berapa Nomor kamu?', (nomor) =>{
        if (validator.isMobilePhone(`${nomor}`, 'id-ID')){
            rl.question('Apa email kamu?', (email) => {
                if(validator.isEmail(`${email}`)){
                    console.log(`Nama Saya ${name}, Nomor Hp Saya ${nomor}, Email Saya ${email}`)
                }else{
                    rl.close()
                }
                rl.close()
            })        
        }else{
            console.log('Mobile Phone is Invalid')
            rl.close()
        }
    })
})


 