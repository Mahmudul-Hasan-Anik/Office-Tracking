const express = require('express')
const Post = require('../models/PostModal')

const PostRouter = express.Router()

PostRouter.post('/post', async(req,res)=>{
    const newPost = new Post({
        name: req.body.name,
        hour: req.body.hour,
        activity: req.body.activity
    })

    const myPost = await newPost.save().then(()=>{
        res.status(201).json({msg:'Data sent Succefully'})
    }).catch((err)=>{
        res.status(501).json({msg:'Internet server problem'})
    })
})

PostRouter.get('/post', (req,res)=>{
    Post.deleteMany()

    Post.find({}, (err,docs)=>{
        res.send(docs)
    })
})

PostRouter.get('/post/:id', (req,res)=>{
    Post.findById({_id: req.params.id}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json(err)
        }
    })
})

PostRouter.post('/post/delete', (req,res)=>{
    Post.findByIdAndDelete({_id: req.body.id}, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json(err)
        }
    })
})

PostRouter.put('/post/edit', (req,res)=>{

    const update = {
        name: req.body.name,
        hour: req.body.hour,
        activity: req.body.activity
    }

    Post.findByIdAndUpdate(req.body.id, update, (err,docs)=>{
        if(docs){
            res.send(docs)
        }else{
            res.status(400).json(err)
        } 
    })
})

module.exports = PostRouter