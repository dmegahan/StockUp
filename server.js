var routing = require('./src/js/routing.js');
var express = require('express');

var server = express();

server.use(express.static(__dirname + '/src/components'));
server.use(express.static(__dirname + '/src/js/lib'));
server.use(express.static(__dirname + '/src/js'));

server.get('/', (request, response) => {
    routing.home(request, response);
});

server.listen(80, () => {
    console.log('HTTP server listening on port 80');
})