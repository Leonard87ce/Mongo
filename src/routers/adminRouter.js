const express = require('express')
const debug = require('debug')('app:adminRouter')
const { MongoClient } = require('mongodb')
const sessions = require('../data/sessions.json')

const adminRouter = express.Router()

adminRouter.route('/').get((req, res)=>{
    const URL  = 'mongodb+srv://leonardthebear:YJEQ5hIm26spyLjI@mongoproj.s0wzdnk.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'mongoproj';

    (async function mongo(){
        let client
        try {
            client = await MongoClient.connect(URL)
            console.log('Connected to the mongo DB')

            const db = client.db(dbName)

            const response = await db.collection('sessions').insertMany(sessions)
            res.json(response)

        } catch (error){
            console.log(error.stack)
        }
        client.close();
    })()
})

module.exports = adminRouter