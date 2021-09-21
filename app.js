const http = require("http");
const fs = require("fs");
const path = require("path")

http.createServer(function(req, res) {

    if (req.url == "/") {
        res.writeHead(200, {"content-type":"text/html;charset=UTF-8"});
        res.end(fs.readFileSync("./index.html"));
    }
    else if (req.url.match(/.css$/)) {
            res.writeHead(200, {"content-type":"text/css;charset=UTF-8"});
            res.end(fs.readFileSync(path.join(__dirname, "public", req.url)));
    }
    else if (req.url.match(/.js$/)) {
        res.writeHead(200, {"content-type":"text/js;charset=UTF-8"});
        res.end(fs.readFileSync(path.join(__dirname, "public", req.url)));
    }
    else if (req.url.match(/png$/)) {
        res.writeHead(200, {"content-type":"image/png"});
        res.end(fs.readFileSync(path.join(__dirname, "public", req.url)));
    }
    else {
        res.writeHead(404, {"content-type":"text/plain"});
        res.end("ERROR 404. No se reconoce el archivo especificado.;")
    }

}).listen(3000, "0.0.0.0");

console.log("Servidor funcionando...")
