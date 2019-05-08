function handleHTTP(req, res) {

    if (req.method === 'GET') {
        if (req.url === '/') {
            res.writeHead(200, {'Content-type':'text-plain'});
            res.write('Hello World ');
            res.end(Math.random().toString());
        } else {
            res.writeHead(403);res.end('Go away');
        }
    } else {
        res.writeHead(403);res.end('Go away');
    }

}

var http = require('http');
var http_server = http.createServer(handleHTTP);
var host = 'localhost';
var port = 8006;

http_server.listen(port, host);