var http =require("http");
var url = require("url");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

http.createServer(function(request,response){
    var postData = '';
    var pathname = url.parse(request.url).pathname;
    //request.setEncoding('utf8');
    //request.addListener('data',function(postDataChunk){
    //    postData += postDataChunk;
    //    console.log('data:'+postData);
    //});
    //request.addListener('end',function(){
        router.route(handle,pathname,request,response);
    //});
    //response.writeHead(200,{"Content-Type":"text/plain"});
    //response.write(view);
    //response.end();
}).listen(8888,'127.0.0.1');