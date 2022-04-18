const LocalStrategy = require('passport-local').Strategy
const pool = require('./db')
const bcrypt = require('bcryptjs')
const { Passport } = require('passport')

function initialize(passport){
    console.log('Initialized')

    const authenticateUser = (username, password, done)=>{
        console.log(username,password)
        pool.query(`SELECT * FROM users WHERE username=$1`, [username],(err,result)=>{
            if (err){
                throw(err)
            }
            console.log(result.rows)
            if (result.rows.length > 0){
                const user = result.rows[0]
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if (err){
                        console.log(err)
                    }
                    if (isMatch){
                        return done(null, user)
                    }else{
                        //password incorrect
                        return done(null, false, {message: "Password is Incorrect"})
                    }
                })
            }else{
                //user not found
                return done(null, false, {message: "User Not Found"})
            }
        })
    }
    passport.use(new LocalStrategy(
        {usernameField: "username", passwordField: "password"},
        authenticateUser
    ))
    passport.serializeUser((user, done)=> done(null, user.id))

    passport.deserializeUser((id, done)=>{
        pool.query(`SELECT * FROM users WHERE id=$1`,[id],(err,result)=>{
            if(err){
                return done(err)
            }
            console.log(`ID is ${result.rows[0].id}`)
            return done(null, result.rows[0])
        })
    })
}

module.exports = initialize