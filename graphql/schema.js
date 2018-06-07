const graphql = require('graphql');
const PaintingType = require('./PaintingType');
const TaskType = require('./TaskType');
const Painting = require('./../models/Painting');
const Task = require('./../models/Task');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema
} = graphql;

const PaintingQuery = new GraphQLObjectType({
    name: 'PaintingQueryType',
    fields: {
        painting: {
            type: PaintingType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                return Painting.findById(args.id)
            }
        }
    }
});

const TaskQuery = new GraphQLObjectType({
    name: 'TaskQueryType',
    fields: {
        task: {
            type: TaskType,
            resolve(parent, args){
                return Task.find()
            }
        }
    }
});

module.exports = 
new GraphQLSchema({        
    query: TaskQuery
});
/*new GraphQLSchema({
    query: PaintingQuery
})*/
