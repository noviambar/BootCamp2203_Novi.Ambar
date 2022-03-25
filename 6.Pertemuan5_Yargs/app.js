const yargs = require('yargs')
const contacts = require('./contacts') //Memanggil file contacts.js
const validator = require('validator')

yargs.command({         //Memberikan command dari list
    command: 'add',
    describe: 'add new contact',
    builder:{           //command lanjutan
        name:{
            describe: 'Contact Name',
            demandOption: true,     //Harus memasukkan data nama
            type: 'string',
        },
        email: {
            describe: 'Contact Email',
            demandOption: false,    //Tidak diwajibkan untuk memasukkan data email
            type: 'string',
        },
        mobile:{
            describe: 'Contact Mobile Phone Number',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){          
        contacts.saveContact(argv.name,argv.email,argv.mobile)       // Menjalankan fungsi saveContact
        // const contact = {
        //     name: argv.name,
        //     email: argv.email,
        //     mobile: argv.mobile,
        // }
        // console.log(contact) //Melihat content dari contact
    },
})

yargs.parse() //Parsing untuk memanggil yargs

// console.log(yargs.argv)


// const contacts = require('./contacts')

// const main = async()=>{
//     const name = await contacts.questions('What is your name?')
//     const email = await contacts.questions('Your email addres?')
//     const mobile = await contacts.questions('Your mobile number?')

//     contacts.saveContact(name,email,mobile)
// }
// main()