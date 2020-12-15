const taskController = {};
const Task = require('../models/taskModel');
const { body, validationResult } = require('express-validator');

taskController.renderTasks = async(req, res) => {
    const tasks = await Task.find({ user: req.user.id }).sort({ date: 'desc' });
    res.render('tasks/tasks', {
        title: 'Tasks',
        tasks
    });
}

taskController.renderTaskForm = (req, res) => {
    res.render('tasks/taskform', {
        title: 'Create Task'
    });
}

taskController.createTask = [
    //Validate and sanitize fields.
    body('date', 'Date must not be empty.').trim().isLength({ min: 1 }),
    body('description', 'Description not be empty.').trim().isLength({ min: 1 }).escape(),

    //Process request after validation and sanitization.
    async(req, res, next) => {

        //Extract the validation errors form a request.
        const errors = validationResult(req);

        //Create a Task object with escaped and trimmed data.
        var task = new Task({
            date: req.body.date,
            description: req.body.description
        });

        if (!errors.isEmpty()) {
            res.render('tasks/taskform', {
                title: 'Create Task',
                task,
                errors: errors.array()
            });
        } else {
            await task.save(function(err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/tasks');
            });
            task.user = req.user.id;
        }
    }
];

//Get status task
taskController.statusTask = async(req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/tasks');
}

//Get delete task
taskController.deleteTask = async(req, res) => {
    const { id } = req.params;
    await Task.remove({ _id: id });
    res.redirect('back');
}

//GET Edit task
taskController.renderEditTask = async(req, res) => {
    const task = await Task.findById(req.params.id);
    console.log(task);
    res.render('tasks/taskform', {
        title: 'Edit Task',
        task
    });
}

//POST Edit task
taskController.editTask = [
    //Validate and sanitize fields.
    body('date', 'Date must not be empty.').trim().isLength({ min: 1 }),
    body('description', 'Description not be empty.').trim().isLength({ min: 1 }).escape(),

    //Process request after validation and sanitization.
    async(req, res, next) => {

        //Extract the validation errors form a request.
        const errors = validationResult(req);

        //Create a Task object with escaped and trimmed data.
        var task = new Task({
            date: req.body.date,
            description: req.body.description,
            _id: req.params.id
        });

        if (!errors.isEmpty()) {
            res.render('tasks/taskform', {
                title: 'Edit Task',
                task,
                errors: errors.array()
            });
        } else {
            const { id } = req.params;
            await Task.update({ _id: id }, req.body);
            res.redirect('/tasks');
        }
    }
];

module.exports = taskController;