const Formalite = require('../models/Formalite.js')


exports.createFormaliteController = (req, res) => {
    const formalite = new Formalite(req.body)
    formalite.save()
        .then(() => res.status(201).json({ message: 'Formalite created !' }))
        .catch((error) => res.status(400).json({ error }))
}

exports.readAllFormaliteController = (req, res) => {
    Formalite.find()
        .then((formalites) => res.status(200).json(formalites))
        .catch((error) => res.status(400).json({ error }))
}

exports.readOneFormaliteController = (req, res) => {
    console.log(req.query.exId)
    Formalite.findOne({ exId : req.query.exId })
        .then((formalite) => res.status(200).json(formalite))
        .catch((error) => res.status(400).json({ error }))
}

exports.updateOneFormaliteController = (req, res) => {
    Formalite.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((formalite) => res.status(200).json(formalite))
        .catch((error) => res.status(400).json({ error }))
}

exports.deleteOneFormaliteController = (req, res) => {
    Formalite.findByIdAndDelete(req.params.id)
        .then((formalite) => res.status(200).json(formalite))
        .catch((error) => res.status(400).json({ error }))
}
