'use strict';

const hapi = require('hapi');
const mongoose = require('mongoose');
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');
const Painting = require('./models/Painting');
const config = require('./config');

/* swagger section */
const Inert = require('inert'); // for load static content like css, html files, images,...
const Vision = require('vision'); // for use views engine
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

mongoose.connect(config.database);
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

const init = async () => {
       
    await server.register([
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
        }
    ]);
    
    await server.register({
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
    });
    
    await server.register({
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
    });
    
    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'views',
        helpersPath: 'helpers' // use on index.html
    });
        
        server.route([
            {                                   // use of views - load and send data to a view
                method: 'GET',
                path: '/',
                config: {
                    description: 'Homepage',
                    tags: ['home']
                },
                handler: (req, h) => {
                    return h.view('index' ,{ title: 'My home page' }); 
                }
            },
            {                                   // use of static
                method: 'GET',
                path: '/image',
                config: {
                    description: 'Image',
                    tags: ['image']
                },
                handler: (req, h) => {
                    return h.file('./public/hapi.png');
                }
            },
            {
                method: 'GET',
                path: '/api/',
                config: {
                    description: 'Only for test purposes',
                    tags: ['api']
                },
                handler: (req, h) => {
                    return 'ok';
                }
            },
            {
                method: 'GET',
                path: '/api/v1/paintings',
                config: {
                    description: 'Get all the paintings',
                    tags: ['api', 'v1', 'painting']
                },
                handler: (req, h) => {
                    return Painting.find();
                }
            },
            {
                method: 'DELETE',
                path: '/api/user/{name}',
                config: {
                    description: 'Name of an user',
                    tags: ['api', 'user', 'name']
                },
                handler: (req, h) => {
                    return req.params.name;
                }
            },
            {
                method: 'POST',
                path: '/api/v1/paintings',
                config: {
                    description: 'Get a specific painting by ID.',
                    tags: ['api', 'v1', 'painting']
                },
                handler: (req, h) => {
                    const { name, url, technique } = req.payload;
                    const painting = new Painting({
                        name,
                        url,
                        technique
                    });
                    
                    return painting.save();
                }
            }
        ]);
        
        await server.start();
        console.log(`Server running at: ${server.info.uri}`);
    };
    
    process.on('unhandledRejection', (err) => {
        
        console.log(err);
        process.exit(1);
    });
    
    init();
    