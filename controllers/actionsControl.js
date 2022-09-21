const Action = require('../models/Actions.js')

exports.createActionController = (req, res) => {
    const action = new Action(req.body)
    action.save()
    .then(() => res.status(201).json({ message : 'Action enregistrée!'}))
    .catch((error) => res.status(400).json({ error }))
}

exports.readAllActionController = (req, res, next) => {
    Action.find()
    .then((AllActions) => res.status(200).json(AllActions))
    .catch((error) => res.status(400).json({ error }))
}

exports.readUserAction = (req, res) => {
    Action.find({ userId : req.decodedUserId })
    .then((action) => res.status(200).json(action))
    .catch((error) => res.status(400).json({ error }))
}

exports.updateOneActionController = (req, res, next) => {
    Action
    .updateOne({_id : req.params.id}, {...req.body, _id : req.params.id})
    .then(() => res.status(200).json({message: 'Action has been modified!'}))
    .catch((error) => res.status(400).json({error}))
}