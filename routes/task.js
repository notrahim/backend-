const {Router } = require('express')
const Task = require('../models/Task')
const taskController = require("../controllers/taskControl")
const router = Router()
const authentication = require("../middleware/authentication")

// All routes for Users, all routes are protected by the middleware "authentication"
// and then go to the controller for actions.

// Route to create a new task
router.post('/', authentication, taskController.createTaskController)

// Route to read all tasks
router.get('/', authentication, taskController.readAllTaskController)

// Route to read a specific task
router.get('/:id', authentication, taskController.readOneTaskController)

// Route to modify a specific task
router.put('/:id', authentication, taskController.updateOneTaskController)

// Route to delete a specific task
router.delete('/:id', authentication, taskController.deleteOneTaskController)

module.exports = router
