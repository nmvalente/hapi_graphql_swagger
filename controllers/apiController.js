const Painting = require('../models/Painting');

module.exports = {
    getUser(req, h) {
        return req.params.name;
    },
    test(req, h) {
        return 'ok';
    }
}