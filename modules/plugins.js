/* swagger section */
const Inert = require('inert'); // for load static content like css, html files, images,...
const Vision = require('vision'); // for use views engine
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package'); // simple include our package.json file

const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('../graphql/schema');
const Painting = require('../models/Painting');
const Task = require('../models/Task');

const plugins = [
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: {
            info: {
                title: 'Paintings API documentation',
                version: Pack.version
            }
        }
    },
    {
        plugin: graphiqlHapi,
        options: {
            path: '/graphiql',
            graphiqlOptions: {
                endpointURL: '/graphql'
            },
            route: {
                cors: true
            }
        } 
    },
    {
        plugin: graphqlHapi,
        options: {
            path: '/graphql',
            graphqlOptions: {
                schema
            },
            route: {
                cors: true
            }
        }
    }
];

module.exports = plugins;