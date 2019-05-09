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
    }

    else if (req.url === '/jquery.js') {
        static_files.serve(req,res);
    }

    else {
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

var io = require('socket.io').listen(http_server);

function connection(socket) {

    function disconnect() {
        console.log('client disconnected');
    }

    function getMessage(msg) {
        io.sockets.emit("broadcast",msg);
    }

    function spy(move) {
        socket.broadcast.emit("spy",move);
    }

    socket.on('disconnect', disconnect);
    socket.on('getMessage', getMessage);
    socket.on('spy', spy);
}


// configure socket.io
io.configure(function(){
    io.enable("browser client minification"); // send minified client
    io.enable("browser client etag"); // apply etag caching logic based on version number
    io.set("log level", 1); // reduce logging
    io.set("transports", [
        "websocket",
        "xhr-polling",
        "jsonp-polling"
    ]);
});

http_server.listen(port, host);
io.on('connection', connection);
