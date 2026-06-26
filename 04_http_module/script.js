//  Protocol means rules. http and https are the 2 protocols
const http = require('http')

// Creating a server 
const server = http.createServer(function(req,res){
    res.end("Hello world");
})

server.listen(3000);


