const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log(`request come ${request.url}`)
    const html = fs.readFileSync('../public/test.html','utf8')
    response.writeHead(200, {
        'Content-Type': 'text/html'
    })
    response.end(html)
}).listen(8888)