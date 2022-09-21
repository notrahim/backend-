const express = require('express')
const router = express.Router()
const ficheController = require('../controllers/ficheControl')

const authentication = require('../middleware/authentication')

router.post('/', authentication, ficheController.createFicheController)
router.get('/', authentication, ficheController.readAllFicheController)
router.put('/:id', authentication, ficheController.updateOneFicheController)
router.delete('/all', authentication, ficheController.deleteAllFiches)
router.delete('/:id', authentication, ficheController.deleteOneFicheController)

module.exports = router