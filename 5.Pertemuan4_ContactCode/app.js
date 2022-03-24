const contacts = require('./contacts')

const main = async()=>{
    const name = await contacts.questions('What is your name?')
    const email = await contacts.questions('Your email addres?')
    const mobile = await contacts.questions('Your mobile number?')

    contacts.saveContact(name,email,mobile)
}
main()

// const fs = require('fs')
// const readline = require('readline')
// const dirPath = './Data'
// const dataPath = './Data/contacts.json'

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })

// const question = (ask) => {
//     return new Promise((resolve,reject)=>{
//         rl.question(ask,(inputVariable)=>{
//             resolve(inputVariable)
//         })
//     })
// }

// const main = async()=>{
//     const name = await question('What is your name?')
//     const mobile = await question('Your mobile phone?')
//     const email = await question('Your Email?')
//     const contact = {name,mobile,email}
//         const file = fs.readFileSync('Data/contacts.json','utf8')
//         const contacts = JSON.parse(file)
//         contacts.push(contact)
//         fs.writeFileSync('Data/contacts.json', JSON.stringify(contacts))
//         console.log('Terima Kasih sudah memasukkan data!')
//         rl.close()
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