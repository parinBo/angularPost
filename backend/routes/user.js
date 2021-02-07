const express = require("express")
const router = express.Router()
const User = require('../databases/DBuser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
router.get("/singup",(req,res)=>{
    res.end("singup")
})

router.post("/singup",(req,res)=>{
    User.findOne({email:req.body.email}).then(usr=>{
        if(usr){
            console.log("test")
        }
    })
    bcrypt.hash(req.body.password,10).then(hash => {
        const user = new User({
            email:req.body.email,
            password: hash
        })
        user.save().then(result=>{
            res.status(201).json({
                message:"User created",
                result:result,
                bool:true
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:"login fail",
                bool:false
            })
        })
    })
})

router.post("/login",(req,res)=>{
    let u;
    User.findOne({email:req.body.email}).then(usr=>{
        if(!usr){
            return res.status(401).json({
                message:"login fail"
            })
        }
        u=usr
        return bcrypt.compare(req.body.password,usr.password)
    }).then(result=>{
        if(!result){
            return res.status(401).json({
                message:"login fail"
            })
        }
        const token = jwt.sign({email:u.email,userId:u._id},'secret_this_should_be_longer',
        {expiresIn:'1h'})
        res.status(200).json({
            token:token,
            message:"true",
            expiresIn:3600
        })
    }).catch(err=>{
        console.log(err)
        return res.status(401).json({
            message:"login fail"
        })
    })
    
    
})



module.exports = router