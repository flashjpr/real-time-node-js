function handleHTTP(req, res) {

    if (req.method === 'GET') {
        if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
            req.addListener("end",function(){
                req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html");
                static_files.serve(req,res);
            });
            req.resume();
        } else {
            res.writeHead(403);
            res.end('Go away');
        }
    } else {
        res.writeHead(403);
        res.end('Go away');
    }

}

var http = require('http');
var http_server = http.createServer(handleHTTP);
var host = 'localhost';
var port = 8006;

var node_static = require('node-static');
var static_files = new node_static.Server(__dirname);

http_server.listen(port, host);