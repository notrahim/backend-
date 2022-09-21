const express = require('express')
const router = express.Router()
const formaliteController = require('../controllers/formaliteControl')

router.post('/', formaliteController.createFormaliteController)
router.get('/', formaliteController.readAllFormaliteController)
router.get('/find', formaliteController.readOneFormaliteController)
router.put('/:id', formaliteController.updateOneFormaliteController)
router.delete('/:id', formaliteController.deleteOneFormaliteController)

module.exports = router