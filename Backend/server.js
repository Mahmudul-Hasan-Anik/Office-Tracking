const express = require('express')
const mongoose = require('mongoose');
const app = express()
const cors = require('cors')
const TodayRouter = require('./routes/TodayRoutes');
const EmplyeeRouter = require('./routes/EmplyeeRoutes');
const PostRouter = require('./routes/PostRoutes');


require('dotenv').config()

mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log('Database connected...')
})

app.use(cors())
app.use(express.json())

app.use('/api', TodayRouter)
app.use('/', EmplyeeRouter)
app.use('/', PostRouter)

app.get('/', (req, res) => {
  res.send('Express is Running')
})



app.listen(8000)
