const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
  notice there is no ID. That's because Mongoose will assign
  an ID by default to all schemas
*/

const TaskSchema = new Schema({
    text: String
});

module.exports = mongoose.model('Task', TaskSchema);