function handleHTTP(req, res) {

    if (req.method === 'GET') {
        if (req.url === '/') {
            res.writeHead(200, {'Content-type': 'text-plain'});

            ASQ(function (done) {
                setTimeout(function () {
                    done(Math.random())
                }, 1000);
            })
                .then(function (done, num) {
                    setTimeout(function () {
                        done('Hello World ' + num)
                    }, 1000)
                })
                .val(function (message) {
                    res.end(message)
                });


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
var ASQ = require('asynquence');

http_server.listen(port, host);