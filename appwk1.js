var fs = require('fs')
var http = require('http')
var path = require('path')
var url = require('url')

http.createServer((req, res) => {
    var parsed = url.parse(req.url);
    var filename = path.parse(parsed.pathname)

    var filen  = filename.name==""?"index":filename.name,
        ext  = filename.ext==""?".html":filename.ext,
        dir  = filename.dir=="/"?"":filename.dir+"/",
        page  = filename.name==""?"index.html":filename.name,

    f = (dir+filen+ext).replace("/","")

    var mimetypes = {
        '.html' : 'text/html',
        '.js' : 'text/javascript',
        '.css' : 'text/css',
        '.png' : 'image/png',
        '.jpg' : 'image/jpg',
        '.gif' : 'image/gif',
    }

    if(f) {
        fs.readFile(f, function(err,data) {
            if(page) {
                if(mimetypes.hasOwnProperty(ext)) {
                    res.writeHead(200, {'Content-Type': mimetypes})
                    res.write("<script>var page='"+filen+"';</script>")
                    res.end(data, 'utf-8')
                }
            }
        })
    }

}).listen('8080')