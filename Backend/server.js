const express = require('express')
const mongoose = require('mongoose');
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const TodayRouter = require('./routes/TodayRoutes');
const EmplyeeRouter = require('./routes/EmplyeeRoutes');
const PostRouter = require('./routes/PostRoutes');
const AuthRouter = require('./routes/AuthRoutes');


require('dotenv').config()

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log('Database connected...')
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', TodayRouter)
app.use('/', EmplyeeRouter)
app.use('/', PostRouter)
app.use('/auth', AuthRouter)

app.get('/', (req, res) => {
  res.send('Express is Running')
})


app.listen(PORT, ()=>{
  console.log(`server is running on http://localhost:${PORT}`)
})
