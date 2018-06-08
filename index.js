'use strict';

const hapi = require('hapi');
const mongoose = require('mongoose');
const config = require('./config');
const Routes = require('./init/routes');
const plugins = require('./modules/plugins');

const server = hapi.server({
    port: 4000,
    host: 'localhost'
});

mongoose.connect(config.database);
mongoose.connection.once('open', () => {
    console.log('Connected to database');
});

const init = async () => {
    
    await server.register(plugins);
    
    server.views(Routes.views);
    
    server.route(Routes.routes(server));
    
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    
    console.log(err);
    process.exit(1);
});

init();
