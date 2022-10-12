const express = require('express')
const debug = require('debug')('app:sessionRouter')
const { MongoClient, ObjectID } = require('mongodb')
const passport = require('passport')

const authRouther = express.Router()

authRouther.route('/signUp').post((req, res)=>{
    const {username, password} = req.body
    const URL  = 'mongodb+srv://leonardthebear:YJEQ5hIm26spyLjI@mongoproj.s0wzdnk.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'mongoproj';

    (async function addUser(){
        let client;
        try {
            client = await MongoClient.connect(URL);

            const db = client.db(dbName);
            const user = {username, password};
            const results = await db.collection('users').insertOne(user);
            console.log(results);
            req.login(results.ops, ()=>{
                res.redirect('/auth/profile');
            });
        } catch (error) {
            console.log(error)
        }
    })();

});

authRouther
    .route('/signIn')
    .get((req, res) =>{
        res.render('signin');
    })
.post(
    passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureMessage: '/',
})
);
authRouther.route('/profile').get((req, res)=>{
    res.json(req.user)
})

module.exports = authRouther