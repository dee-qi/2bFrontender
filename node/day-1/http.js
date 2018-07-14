var http = require('http');

var server = http.createServer();

server.on('request', function(request, response) {
    console.log('rogar that: ' + request.url);
    console.log(request);
    
    response.write('nodejs');

    response.end();
})

server.listen(3000, function () { 
    console.log('服务器启动成功');
});