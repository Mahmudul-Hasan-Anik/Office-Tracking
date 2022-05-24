const express = require('express')
const Today = require('../models/TodayModal')

const TodayRouter = express.Router()

TodayRouter.post('/today', async(req,res)=>{
    const newToday = new Today({
        batch: req.body.batch,
        time: req.body.time,
        room: req.body.room
    })

    const today = await newToday.save().then(()=>{
        res.status(201).json({msg: 'Data Sent Succefully'})
    }).catch((err)=>{
        res.status(500).json({msg:'Internel Problem'})
    })
})

TodayRouter.get('/today', (req,res)=>{
    Today.deleteMany()

    Today.find({}, (err,docs)=>{
        res.send(docs)
    })
})

TodayRouter.get('/today/:id', (req,res)=>{
    Today.findById({_id: req.params.id}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json(err)
        }
    })
})

TodayRouter.post('/today/delete', (req,res)=>{
    Today.findByIdAndDelete({_id: req.body.id} , (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json(err)
        }
    })
})

TodayRouter.put('/today/edit', (req,res)=>{

    const update = {
        batch: req.body.batch,
        time: req.body.time,
        room: req.body.room
    }

    Today.findByIdAndUpdate(req.body.id, update, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json(err)
        }
    })
})

module.exports = TodayRouter