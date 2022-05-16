const express = require('express')
const Emplyee = require('../models/EmplyeeModal')

const EmplyeeRouter = express.Router()

EmplyeeRouter.post('/emplyee', async(req, res) => {
    const newEmplyeeList = new Emplyee({
      name: req.body.name,
      office: req.body.office,
      designation: req.body.designation,
      dayoff: req.body.dayoff
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

module.exports = EmplyeeRouter