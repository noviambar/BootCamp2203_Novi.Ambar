const fs = require('fs')
const readline = require('readline')
const dirPath = './Data'
const dataPath = './Data/contacts.json'

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

const saveContact = (name,email,mobile) => {
    const contact = {name,mobile,email}
    const file = fs.readFileSync('Data/contacts.json','utf8')
    const contacts = JSON.parse(file)
    contacts.push(contact)
    fs.writeFileSync('Data/contacts.json', JSON.stringify(contacts))
    console.log('Terima Kasih sudah memasukkan data!')
            rl.close()
}
module.exports.saveContact = saveContact

const questions = (ask) => {
    return new Promise((resolve,reject)=>{
        rl.question(ask,(inputVariable)=>{
            resolve(inputVariable)
        })
    })
}
module.exports.questions = questions



// const main = async()=>{
//     const name = await questions('What is your name?')
//     const mobile = await questions('Your mobile phone?')
//     const email = await questions('Your Email?')
//     const contact = {name,mobile,email}
//     //Membuat folder data apabila tidak ada
//     if(!fs.existsSync(dirPath)){
//         fs.mkdirSync(dirPath)
//     }
//     //membuat file contacts.json jika belum ada
//     if(!fs.existsSync(dataPath)){
//         fs.writeFileSync(dataPath,'[]','utf-8')
//     }
//     const file = fs.readFileSync('Data/contacts.json','utf8')
//     const contacts = JSON.parse(file)
//     contacts.push(contact)
//     fs.writeFileSync('Data/contacts.json', JSON.stringify(contacts))
//     console.log('Terima Kasih sudah memasukkan data!')
//     rl.close()
// }
// main()

// rl.question('What is yor name? ', (name)=>{
//     rl.question('Your mobile number?',(mobile)=>{
//         const contact = {name,mobile}
//         //Membuat folder data apabila tidak ada
//         if(!fs.existsSync(dirPath)){
//             fs.mkdirSync(dirPath)
//         }
//         //membuat file contacts.json jika belum ada
//         if(!fs.existsSync(dataPath)){
//             fs.writeFileSync(dataPath,'[]','utf-8')
//         }
//         const file = fs.readFileSync('Data/contacts.json','utf8')
//         const contacts = JSON.parse(file)
//         contacts.push(contact)
//         fs.writeFileSync('Data/contacts.json', JSON.stringify(contacts))
//         console.log('Terima Kasih sudah memasukkan data!')
//         rl.close()
//     })
// })