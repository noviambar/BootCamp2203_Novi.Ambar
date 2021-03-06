const yargs = require('yargs')
const contacts = require('./contacts') //Memanggil file contacts.js


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
    },
})

yargs.parse() //Parsing untuk memanggil yargs
