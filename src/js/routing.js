var renderer = require('./renderer.js');

function home(request, response)
{
    response.writeHead(200, {'Content-Type': 'text/html'});
    renderer.view('header', {}, response);
    renderer.view('body', {}, response);
    renderer.view('footer', {}, response);
    response.end();
}

module.exports.home = home;