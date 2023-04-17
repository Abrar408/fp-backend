const Task = require('../model/task');
const {format} = require('date-fns');

// function titleCase(str) {
//     return str.toLowerCase().split(' ').map(function(word) {
//         return word.replace(word[0], word[0].toUpperCase());
//     }).join(' ');
// }

const create = async (req,res) => {
    const {jobName,assignedTo,dueDate,assignedBy,task} = req.body;
    const result = await Task.findOne({jobName}).exec();
    if(result) return res.status(400).send("job name already exists");
    const date = format(new Date(dueDate),'dd-MM-yyyy');
    await Task.create({jobName,assignedTo,dueDate:date,assignedBy,task});
    res.status(200).send("job created successfully");
}
const get = async (req,res) => {
    let jobs = [];
    const {assignedTo} = req.body;
    const regex = new RegExp(`${assignedTo}`,"i");
    const cursor = await Task.find({assignedTo:regex}).cursor();
    if(!cursor) return res.status(200).send('no pending jobs');
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        // console.log(doc.username);
        jobs.push(doc)
    }
    res.status(200).send(jobs);
}
const getAdmin = async (req,res) => {
    let jobs = [];
    const {assignedBy} = req.body;
    const regex = new RegExp(`${assignedBy}`,"i");
    const cursor = await Task.find({assignedBy:regex}).cursor();
    if(!cursor) return res.status(200).send('no pending jobs');
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
        // console.log(doc.username);
        jobs.push(doc)
    }
    res.status(200).send(jobs);
}
const submit = async (req,res) => {
    const {jobName} = req.body;
    await Task.updateOne({jobName},{$set:{status:'in Review...'}})
    res.sendStatus(200);
}
module.exports = {create,get,getAdmin,submit}