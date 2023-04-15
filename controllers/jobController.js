const Task = require('../model/task');

const create = async (req,res) => {
    const {jobName,assignedTo,dueDate,assignedBy,task} = req.body;
    const result = await Task.findOne({jobName}).exec();
    if(result) return res.status(400).send("job name already exists");
    await Task.create({jobName,assignedTo,dueDate,assignedBy,task});
    res.status(200).send("job created successfully");
}
const get = async (req,res) => {

}
module.exports = {create,get}