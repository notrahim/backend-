// important models de la base de donnée User.js
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      })
    
      user
        .save()
        .then(() =>

        User.findOne({email: req.body.email})
        .then((user) =>{
            res.status(201).json({
                // encodage du userId
                    userId: user._id,
                    token: jwt.sign({userId: user._id},`${process.env.JWT_KEY_TOKEN}`,{expiresIn: '12h'})
                })
        })
         
         
    )
        .catch((err) => res.status(500).json({err}).send(console.log(err)))
  })
}

exports.login = (req, res, next) => {
    const auth = req.body.email 

    User.findOne({email: auth})
    .then((user) =>{
        if(!user){
            return res.status(401).json({error: "Couldn't find user"})
        }

        // Control password with bcrypt
        bcrypt
            .compare(req.body.password, user.password)
            .then((controlPassword) => {
                console.log(controlPassword)
            
                // if password is incorrect
                if(!controlPassword){
                    return res.status(401).json({error: "Password is incorrect"})
                }

                // if password is correct
                res.status(200).json({
                // encodage du userId
                    userId: user._id,
                    token: jwt.sign({userId: user._id},`${process.env.JWT_KEY_TOKEN}`,{expiresIn: '12h'})
                })
            })   
            .catch((error) => res.status(500).json({error}))   
        })
        .catch((error) => res.status(500).json({error}))
}

exports.readAllUserController = (req, res, next) => {
    User.find()
    .then((AllUsers) => {
        res.status(200).json(AllUsers)
    })
    .catch((error) => res.status(400).json({error}))
}

exports.readOneUserController = (req, res, next) => {
    User.findOne({_id : req.params.id})
    .then((OneUser) => res.status(200).json(OneUser))
    .catch((error) => res.status(404).json({error}))
}

exports.deleteOneUserController = (req, res, next) => {
    User
    .deleteOne({_id : req.params.id})
    .then(() => res.status(200).json({message: 'User has been deleted'}))
    .catch((error) => res.status(400).json({error}))
}

exports.deleteAllUserController = (req, res, next) => {
    User.deleteMany({})
    .then(() => res.status(200).json({message : 'user has been deleted all'}))
    .catch((error) => res.status(400).json({error}))
}