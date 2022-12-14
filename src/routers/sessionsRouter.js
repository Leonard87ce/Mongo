const express = require('express')
const debug = require('debug')('app:sessionRouter')
const { MongoClient, ObjectID } = require('mongodb')
const sessions = require('../data/sessions.json')
const speakerService = require('../services/speakerService')

const sessionsRouter = express.Router()
sessionsRouter.use((req, res, next)=>{
    if(req.user){
        next();
    } else  {
        res.redirect('/auth/signIn')
    }
})

sessionsRouter.route('/')
.get((req, res) =>{
  const URL  = 'mongodb+srv://leonardthebear:YJEQ5hIm26spyLjI@mongoproj.s0wzdnk.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'mongoproj';

    (async function mongo(){
        let client
        try {
            client = await MongoClient.connect(URL)
            console.log('Connected to the mongo DB')

            const db = client.db(dbName)

            const sessions = await db.collection('sessions').find().toArray()
            res.render('sessions', {sessions})

        } catch (error){
            console.log(error.stack)
        }
        client.close();
    })()
})

sessionsRouter.route('/:id')
.get ((req, res) =>{
  const id =  req.params.id
  const URL  = 'mongodb+srv://leonardthebear:YJEQ5hIm26spyLjI@mongoproj.s0wzdnk.mongodb.net/?retryWrites=true&w=majority'
    const dbName = 'mongoproj';

    (async function mongo(){
        let client
        try {
            client = await MongoClient.connect(URL)
            console.log('Connected to the mongo DB')

            const db = client.db(dbName)

            const session = await db.collection('sessions').findOne({_id: new ObjectID(id)})

            const speaker = await speakerService.getSpeakerById(session.speakers[0].id)

            session.speaker = speaker.data
            res.render('session', {
              session,
            })
        } catch (error){
            console.log(error.stack)
        }
        client.close();
    })()
})

module.exports = sessionsRouter