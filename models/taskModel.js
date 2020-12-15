const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

const TaskSchema = new Schema({
    date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    user: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }

});

//Virtual for task's formatting Date
TaskSchema.virtual('date_format').get(function() {
    return DateTime.fromJSDate(this.date).toLocaleString({ month: 'long', day: 'numeric', year: 'numeric' });
});

module.exports = model('Task', TaskSchema);