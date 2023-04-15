const mongoose = require('mongoose');
const {format} = require('date-fns');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    jobName:String,
    assignedTo:String,
    createdOn:{
        type:String,
        default:Date.now()
    },
    dueDate:Date,  
    assignedBy:String,
    task:String
});
module.exports = mongoose.model('Task', taskSchema); 