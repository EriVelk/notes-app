const express = require('express');
const { editNote } = require('../controllers/notesController');
const router = express.Router();

const {
    renderTasks,
    renderTaskForm,
    createTask,
    statusTask,
    deleteTask,
    renderEditTask,
    editTask
} = require('../controllers/tasksController');

const { isAuthenticated } = require('../helpers/auth');


//Get All Tasks
router.get('/tasks', isAuthenticated, renderTasks);

//Get Task Form
router.get('/tasks/task', isAuthenticated, renderTaskForm);

router.post('/tasks/task', isAuthenticated, createTask);

//Get Status Task 
router.get('/tasks/task/done/:id', isAuthenticated, statusTask);

//Get Delete Task
router.get('/tasks/task/delete/:id', isAuthenticated, deleteTask);

//Get Edit Task
router.get('/tasks/edit/:id', isAuthenticated, renderEditTask);

router.post('/tasks/edit/:id', isAuthenticated, editTask);


module.exports = router;