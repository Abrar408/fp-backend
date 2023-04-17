const mongoose = require('mongoose');
const {format} = require('date-fns');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    jobName:String,
    assignedTo:{
        type:String,
    },
    createdOn:{
        type:String,
        default:format(Date.now(),'dd-MM-yyyy')
    },
    dueDate:String,  
    assignedBy:{
        type:String,
    },
    submittedOn:String,
    task:String,
    status:{
        type:String,
        default:'pending...'
    }
});
module.exports = mongoose.model('Task', taskSchema); 