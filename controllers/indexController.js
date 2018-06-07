module.exports = {
    getImage(req, reply) {
        return h.file('./public/hapi.png');
    },
    getHomepage(req, reply) {
        return h.view('index' ,{ title: 'My home page' }); 
    }
}