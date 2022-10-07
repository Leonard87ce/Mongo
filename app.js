const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require ('path')
var morgan = require('morgan')
const sessionsRouter = express.Router()


app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, '/public/')))

app.set('views', './src/views')
app.set('view engine', 'ejs')

sessionsRouter.route('/')
  .get((req, res) =>{
    res.send('Hello sessions')
  })

sessionsRouter.route('/1')
  .get ((req, res) =>{
    res.send('hello single sessions')
  })

app.use('/sessions', sessionsRouter)

app.get('/', (req, res)=>{
  res.render('index', {title: 'Globomatics', data: ['a', 'b', 'c']})
})
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})