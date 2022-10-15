const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require ('path')
const morgan = require('morgan')
const sessionsRouter = require('./src/routers/sessionsRouter')
const adminRouter = require('./src/routers/adminRouter')
const authRouther = require ('./src/routers/authRouter')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')


app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '/public/')))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(session({secret: 'globomantics'}))

require('./src/config/passport.js')(app)


app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use('/sessions', sessionsRouter)
app.use('/admin', adminRouter)
app.use('/auth', authRouther)

app.get('/', (req, res)=>{
  res.render('index', {title: 'Globomatics', data: ['a', 'b', 'c']})
})
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
}) 