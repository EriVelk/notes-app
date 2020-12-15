const callendarController = {};
const Task = require('../models/taskModel');

callendarController.renderCallendar = async(req, res) => {
    const tasks = await Task.find({ user: req.user.id }).sort({ date: 'desc' });

    res.render('callendar/callendar', {
        title: 'Calendar',
        tasksTitle: 'Tasks',
        tasks
    });
}


module.exports = callendarController;