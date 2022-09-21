const {Router } = require('express')
const User = require('../models/User')
const userController = require("../controllers/userControl")
const password = require("../middleware/password")
const router = Router()

// All routes for Users, all routes are protected by the middleware "authentication"
// and then go to the controller for actions.

router.post("/signup", password, userController.signup)
router.post("/login", userController.login)
router.get('/', userController.readAllUserController)
router.get('/:id', userController.readOneUserController)
router.delete('/all', userController.deleteAllUserController)
router.delete('/:id', userController.deleteOneUserController)

module.exports = router
