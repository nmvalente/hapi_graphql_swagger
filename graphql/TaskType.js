const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLString },
        text: { type: GraphQLString }
    })
});

module.exports = TaskType;