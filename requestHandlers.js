/**
 * Created by Administrator on 2014/11/3.
 */
var querystring = require("querystring");
var formidable = require("formidable");
var fs = require("fs");

function start(request,response){
    var body = '<html>'+     
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />'+     
        '</head>'+     
        '<body>'+
        '<form action="/upload" method="post" enctype="multipart/form-data">'+
        '<textarea name="text" rows="20" cols="60"></textarea>'+ 
        '<input type="file" name="upload" multiple="multiple" />' +    
        '<input type="submit" value="提交表单" />'+     
        '</form>'+     
        '</body>'+     
        '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});     
    response.write(body);     
    response.end();
}

function upload(request,response,postData) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    form.uploadDir = "tmp"
    // console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        //console.log("parsing done");
        console.log("F.U.P: " + files.upload.path);
        setTimeout(function(){
                try{
                    fs.renameSync(files.upload.path, "tmp/test.png");
                }catch(e){
                    console.log(e);
                }
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write("received image:<br/>");
                response.write("<img src='/show' />");
                response.end();
            },1000
        );
    });
}

function show(request,response,postData){
    fs.readFile('./tmp/test.png','binary',function(error,file){
        if(error){
            response.writeHead(500,{'content-type':'text/plain'});
            response.write(error+"\n");
            response.end();
        }else{
            response.writeHead(200,{'Content-type':'image/png'});
            response.write(file,"binary");
            response.end();
        }
    })
}

exports.start = start;
exports.upload = upload;
exports.show = show;