const fs = require('fs')
const readline = require('readline')
const dirPath = './Data'
const dataPath = './Data/contacts.json'
const validator = require('validator')
const { array } = require('yargs')

//Membuat folder data apabila tidak ada
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}
//membuat file contacts.json jika belum ada
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8')
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//Function untuk mengecek contacts.json
const loadContact = () => {
    const file = fs.readFileSync('Data/contacts.json','utf-8')
    const contacts = JSON.parse(file)
    return contacts
}

//Function untuk memanggil list dari contact
const listContact=()=>{
    const contacts = loadContact()
    console.log('Contact List: ')
    contacts.forEach((contact,i)=>{     //Mencari data dengan forEach
        console.log(`${i+1}.${contact.name} - ${contact.mobile}`)
    })
}

//Function untuk menampilkan detail contact based on name
const detailContact=(name)=>{
    const contacts = loadContact()
    fs.writeFileSync('Data/contacts.json', JSON.stringify(contacts))
    contacts.forEach((contact)=>{
        if (`${contact.name}` === name){
            console.log(`${contact.name}`)
            console.log(`${contact.email}`)
            console.log(`${contact.mobile}`)
        } 
    })
}

//Function Delete data
const deleteContact = (name) =>{
    const contacts = loadContact()
    fs.writeFileSync('Data/contacts.json', JSON.stringify(contacts))
    contacts.forEach((contact)=>{
        if (`${contact.name}` != name){ 
            
            fs.writeFileSync('Data/contacts.json', JSON.stringify([contact]))
        } 
    })
}

//function untuk menyimpan data
const saveContact = (name,email,mobile) => {
    const contact = {name,email,mobile}
 
    //Validator Email
    if(email){
        if (!validator.isEmail(email)){
            console.log('Email Is Invalid')
            return false
        }
    }
    
    //Validator Mobile Phone
    if (!validator.isMobilePhone(mobile, 'id-ID')){
        console.log('Mobile Phone is Incorrect')
        return false
    }

    const contacts = loadContact()

    //Mengecek data apakah nama sudah ada di contacts.json
    const duplicate=contacts.find((contact)=>contact.name===name)
    if (duplicate){
        console.log('Contact name is already recorded. Use another contact name')
        return false
    }

    contacts.push(contact)
    fs.writeFileSync('Data/contacts.json', JSON.stringify(contacts))
    console.log('Terima Kasih sudah memasukkan data!')
    //rl.close()
}
module.exports = {saveContact, listContact, detailContact, deleteContact}


//Function untuk menanyakan
// const questions = (ask) => {
//     return new Promise((resolve,reject)=>{
//         rl.question(ask,(inputVariable)=>{
//             resolve(inputVariable)
//         })
//     })
// }
// module.exports.questions = questions