const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require ('path')
const morgan = require('morgan')
const sessionsRouter = require('./src/routers/sessionsRouter')
const adminRouter = require('./src/routers/adminRouter')



app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '/public/')))

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use('/sessions', sessionsRouter)
app.use('/admin', adminRouter)

app.get('/', (req, res)=>{
  res.render('index', {title: 'Globomatics', data: ['a', 'b', 'c']})
})
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
})