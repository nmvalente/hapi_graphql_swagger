const Painting = require('../models/Painting');

module.exports = {
    create(req, h) {
        const { name, url, technique } = req.payload;
        const painting = new Painting({
            name,
            url,
            technique
        });
        
        return painting.save();
    },
    find(req, h) {
        return Painting.find();
    }
}