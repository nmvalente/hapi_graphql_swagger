const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        text: { type: GraphQLString }
    })
});

module.exports = TaskType;