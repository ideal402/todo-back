const express = require("express");
const taskController = require("../controller/task.controller");
const router = express.Router()
//라우터 정의


router.post('/', taskController.createTask);

router.get('/', taskController.getTask);

router.put('/:id', taskController.updateTask);

router.put('/flag/:id', taskController.flagTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;