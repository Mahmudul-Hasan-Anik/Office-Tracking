const express = require('express')
const Emplyee = require('../models/EmplyeeModal')
const Auth = require('../models/authModals')
const { Schema } = require('mongoose')

const EmplyeeRouter = express.Router()

EmplyeeRouter.post('/emplyee', async(req, res) => {

    const newEmplyeeList = await new Emplyee({
      name: req.body.name,
      office: req.body.office,
      designation: req.body.designation,
      dayoff: req.body.dayoff,
      // users: req.user._id
    })
  
    const emplyee = await newEmplyeeList.save().then(()=>{
      res.status(201).json({msg:'Successfully Created'})
    }).catch((err)=>{
      res.status(500).json({msg:'Failed'})
    })
  
  
  })

EmplyeeRouter.get('/emplyee', (req,res)=>{
    Emplyee.deleteMany()
    Emplyee.find({}, (err, docs)=>{
        res.send(docs)
    })
})

EmplyeeRouter.get('/emplyee/:id', (req,res)=>{
  Emplyee.findById({_id: req.params.id}, (err,docs)=>{
    if(docs){
      res.send(docs)
    }else{
      res.send(err)
    }
  })
})

EmplyeeRouter.post('/emplyee/delete', (req,res)=>{
  Emplyee.findByIdAndDelete({_id: req.body.id}, (err,docs)=>{
    if(docs){
      res.send(docs)
    }else{
      res.send(err)
    }
  })
})

EmplyeeRouter.put('/emplyee/edit',(req,res)=>{

  const update = {
    name: req.body.name,
    office: req.body.office,
    designation: req.body.designation,
    dayoff: req.body.dayoff,
  }

  Emplyee.findByIdAndUpdate(req.body.id, update, (err,docs)=>{
    if(docs){
      res.send(docs)
    }else{
      res.status(400).json({msg:'Data updata failed'})
    }
  })
})

module.exports = EmplyeeRouter