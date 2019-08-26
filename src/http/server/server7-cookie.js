const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log(`request come ${request.url}`)
    if ('/' === request.url) {
        const html = fs.readFileSync('../public/test.html','utf8')
        response.writeHead(200, {
            'Content-Type': 'text/html',
            'Set-Cookie': ['id=123; max-age=2', 'abc=234;domain=test.com'] // 是可以设置过期时间的
        })
        response.end(html)
    }
}).listen(8666)