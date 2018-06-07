const Painting = require('../models/Painting');

module.exports = {
    create(req, reply) {
        const { name, url, technique } = req.payload;
        const painting = new Painting({
            name,
            url,
            technique
        });
        
        return painting.save();
    },
    find(req, reply) {
        return Painting.find();
    }
}