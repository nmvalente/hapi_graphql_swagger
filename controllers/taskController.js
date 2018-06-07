const Task = require('../models/Task');

let create = (req, h) => {
    let text = req.payload.text; // middleware and bodyparser in express, here just payload
    let newTask = new Task({text: text});
    newTask.save((err, task) => {
        if(err) return new Error(err);
        
    })
    return find(req,h);
};

let find = async(req, h) => {
    let tasks;
    try{
        tasks = await Task.find({}, function(err, tasks){
            
            console.log(tasks);
            return tasks;
        });
    }
    catch(err){
        return new Error(err);
    }
    return h.view('tasks' ,{
        tasks
    })
};

module.exports = {
    create: create,
    find: find
};