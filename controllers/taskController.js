const Task = require('../models/Task');

module.exports = {
    create(req, h) {
        let text = req.payload.text; // middleware and bodyparser in express, here just payload
        let newTask = new Task({text: text});
        newTask.save((err, task) => {
            if(err) return new Error(err);
            
        })
        return h.view('tasks');
        
    },
    find(req, h) {
        let arr_tasks = Task.find({}, function(err, tasks){
            if(err) return new Error(err);
            return tasks;                    
        });
        console.log(arr_tasks);
        return h.view('tasks' ,{
            tasks: arr_tasks/*[
                {_id: "1", text:"fdsf"},
                {_id: "2", text: "dofhiio"},
            ]*/
        })
    }
};