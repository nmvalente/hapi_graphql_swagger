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

const Query = new GraphQLObjectType({
    name: 'Root',
    fields: {
        painting: {
            type: PaintingType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                return Painting.findById(args.id)
            }
        },
        task: {
            type: TaskType,
            args: {},
            resolve(parent, args){
                return Task.find();
            }
        }
    }
});

module.exports = new GraphQLSchema({        
    query: Query
});