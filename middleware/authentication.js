const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

// Check userId token to validate access to the route

module.exports = (req, res, next) => {
    try{

        const token = req.headers.authorization.split(" ")[1]
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`)

        const userIdDecodedToken = decodedToken.userId
        console.log('token is', userIdDecodedToken)
        if(req.method==='GET'){
            req.decodedUserId=userIdDecodedToken;
            next()
        }
        else{
        if(req.body.userId && (req.body.userId === userIdDecodedToken)){
            next()
        }else{
           throw "User Id non valide"
        }
    }
    }catch(error){
        res.status(401).json({error: "Vous n'êtes pas authentifié"})
    }
}