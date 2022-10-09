const express = require('express')
const debug = require('debug')('app:sessionRouter')
const { MongoClient, ObjectID } = require('mongodb')

const authRouther = express.Router()

authRouther.route('/signUp').post((req, res)=>{
    //To Do create user
    req.login(req.body, ()=>{
        res.redirect('/auth/profile')
    })
})
authRouther.route('/profile').get((req, res)=>{
    res.json(req.user)
})

module.exports = authRouther