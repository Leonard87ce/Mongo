const passport = require('passport')
const {Strategy} = require('passport-local')
const {MongoClient} = require('mongodb')
const debug = require('debug')('app:localStrategy')


module.exports = function localStrategy(){
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password',
    }, 
    (username, password, done)=>{
        const URL  = 'mongodb+srv://leonardthebear:YJEQ5hIm26spyLjI@mongoproj.s0wzdnk.mongodb.net/?retryWrites=true&w=majority'
        const dbName = 'mongoproj';
        (async function validateuser(){
            let client
            try {
                client = await MongoClient.connect(URL)
                debug('Connected to the Mongo DB');

                const db = client.db(dbName) 

                const user = await db.collection('users').findOne({username})

                if (user && user.password === password){
                    done(null, user)
                } else{
                    done(null, flase)
                }
            } catch (error) {
                done(null, false)
            }
            client.close()
        }())
    }))
}