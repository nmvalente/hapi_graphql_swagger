module.exports = {
    getImage(req, h) {
        return h.file('./public/hapi.png');
    },
    getHomepage(req, h) {
        return h.view('index' ,{ title: 'My home page' }); 
    }
}