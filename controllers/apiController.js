const Painting = require('../models/Painting');

module.exports = {
    getUser(req, reply) {
        return req.params.name;
    },
    test(req, reply) {
        return 'ok';
    }
}