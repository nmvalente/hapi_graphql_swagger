// Routes controller imports
const paintingController = require('../controllers/paintingController');
const taskController = require('../controllers/taskController');
const indexController = require('../controllers/indexController');
const apiController = require('../controllers/apiController');

const Joi = require('joi'); 

const views = {
    engines: {
        html: {
            module: require('handlebars')
        }
    },
    relativeTo: __dirname,
    path: '../views',
    helpersPath: '../helpers' // use on index.html
};

const routes = (server) => [
    {                                   // use of views - load and send data to a view
        method: 'GET',
        path: '/',
        config: {
            handler: indexController.getHomepage,
            description: 'Homepage',
            tags: ['api','home', 'init']
        }
    },
    {                                   // use of static
        method: 'GET',
        path: '/image',
        config: {
            handler: indexController.getImage,
            description: 'Image',
            tags: ['api','image','static']
        }
    },
    {                                 // example to iterate over array on /tasks                  
        method: 'GET',
        path: '/tasks',
        config: {
            handler: taskController.find,
            description: 'Tasks',
            tags: ['api','tasks', 'get']
        }
    },
    {                                 // example to iterate over array on /tasks                  
        method: 'POST',
        path: '/tasks',
        config: {
            handler: taskController.create,
            description: 'Tasks',
            tags: ['api']
        }
    },
    {
        method: 'GET',
        path: '/api',
        config: {
            handler: apiController.test,
            description: 'Only for test purposes',
            tags: ['api', 'init']
        },
    },
    {
        method: 'GET',
        path: '/api/v1/paintings',
        config: {
            handler: paintingController.find,
            description: 'Get all the paintings',
            tags: ['api', 'v1', 'painting']
        }
    },
    {
        method: 'GET',
        path: '/api/user/{name}',
        config: {
            handler: apiController.getUser,
            description: 'Get an user by name',
            tags: ['api', 'user', 'name'],
            validate: {
                params: {
                    name: Joi.string().min(3).max(10)
                },
                failAction: (request, h, err) => {
                    throw err;
                    return;
                }
            } 
        }
    },
    {
        method: 'POST',
        path: '/api/v1/paintings',
        config: {
            handler: paintingController.create,
            description: 'Post a painting with text.',
            tags: ['api', 'v1', 'painting']
        }
    }
];

module.exports = {
    routes,
    views
};