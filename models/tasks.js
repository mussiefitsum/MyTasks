const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true,
        enum: ['Personal', 'Productivity', 'Other']
    },
    status: {
        type: String,
        required: true,
        enum: ['To Do', 'In Progress', 'Done']
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);