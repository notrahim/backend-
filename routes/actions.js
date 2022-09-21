const express = require('express')
const router = express.Router()
const actionController = require('../controllers/actionsControl')

const authentication = require('../middleware/authentication')

router.post('/', authentication, actionController.createActionController)
router.get('/', authentication, actionController.readUserAction)
// router.get('/:id', authentication, actionController.readOneActionController)
router.put('/:id', authentication, actionController.updateOneActionController)
//router.delete('/:id', authentication, actionController.deleteOneActionController)

module.exports = router