const Task = require("../models/Task")

// Créer une nouvelle task sur le calendrier 

exports.createTaskController = (req, res, next) => {
    console.log(req.body)

    const taskObject = req.body

    const task = new Task({
        ...taskObject
    })
    task
    .save()
    .then(() => {
        res.status(201).json({
            message: "New task registered in the database!",
            contenu: req.body
        })
    })
    .catch((error) => res.status(400).json({error}))
}

exports.readAllTaskController = (req, res, next) => {
    Task.find({ userId:req.decodedUserId })
    .then((AllTasks) => {
        res.status(200).json(AllTasks)
    })
    .catch((error) => res.status(400).json({error}))
}

exports.readOneTaskController = (req, res, next) => {
    Task.findOne({_id : req.params.id})
    .then((OneTask) => res.status(200).json(OneTask))
    .catch((error) => res.status(404).json({error}))
}

exports.updateOneTaskController = (req, res, next) => {
    Task
    .updateOne({_id : req.params.id}, {...req.body, _id : req.params.id})
    .then(() => res.status(200).json({message: 'Task has been modified!'}))
    .catch((error) => res.status(400).json({error}))
}

exports.deleteOneTaskController = (req, res, next) => {
    Task
    .deleteOne({_id : req.params.id})
    .then(() => res.status(200).json({message: 'Task has been deleted!'}))
    .catch((error) => res.status(400).json({error}))
}

exports.deleteManyTaskController = (req, res, next) => {
    Task
    .deleteMany({userId : req.decodedUserId})
    .then(() => res.status(200).json({message: 'Task has been deleted!'}))
    .catch((error) => res.status(400).json({error}))
}
