const express = require('express')
const bcrypt = require('bcrypt');
const Auth = require('../models/authModals')

const AuthRouter = express.Router()

AuthRouter.post('/', async(req,res)=>{
    const {name, email, password} = req.body

        const newAuth = new Auth({
            name: name,
            email: email,
            password: bcrypt.hashSync(password, 10),
        })
    
        await newAuth.save().then(()=>{
            res.status(201).json({msg:'Registration Successful'})
        }).catch((err)=>{
            res.status(401).json({msg:'Registration Failed'})
        })  
})


AuthRouter.post('/login',async(req,res)=>{
    const auth = await Auth.findOne({email: req.body.email})

    if(auth){
        if(bcrypt.compareSync(req.body.password, auth.password)){
           
            res.send({
                _id: auth.id,
                name: auth.name,
                email: auth.email
            })
            return
        }
    }

   res.status(401).json({msg:'login fail'})
})

module.exports = AuthRouter