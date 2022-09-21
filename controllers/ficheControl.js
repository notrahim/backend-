const Fiche = require('../models/Fiche.js');

exports.createFicheController = (req, res, next) => {
    console.log(req.body)

    const ficheObject = req.body

    const fiche = new Fiche({
        ...ficheObject
    })

    fiche
    .save()
    .then(() => {
        res.status(201).json({
            message: "New user fiche has been inserted in database!",
            contenu: req.body
        })
    })
    .catch((error) => res.status(400).json({error}))
}

exports.readAllFicheController = (req, res, next) => {
    // Fiche.find({})
    Fiche.find({userId:req.decodedUserId})
    .then((AllFiches) => {
        console.log(AllFiches);
        res.status(200).json(AllFiches)
    })
    .catch((error) => res.status(400).json({error}))
}

exports.readOneFicheController = (req, res, next) => {
    Fiche.findOne({_id : req.params.id})
    .then((OneFiche) => res.status(200).json(OneFiche))
    .catch((error) => res.status(404).json({error}))
}

exports.updateOneFicheController = (req, res, next) => {
    Fiche
    .updateOne({_id : req.params.id}, {...req.body, _id : req.params.id})
    .then(() => res.status(200).json({message: 'User fiche has been updated!'}))
    .catch((error) => res.status(400).json({error}))
}

exports.deleteOneFicheController = (req, res, next) => {
    Fiche
    .deleteOne({_id : req.params.id})
    .then(() => res.status(200).json({message: 'User fiche has been deleted'}))
    .catch((error) => res.status(400).json({error}))
}

exports.deleteAllFiches = (req, res, next) => {
    Fiche.deleteMany({})
    .then(() => res.status(200).json({message : 'all fiche deleted'}))
    .catch((error) => res.status(400).json({error}))
}