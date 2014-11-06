/**
 * Created by Administrator on 2014/11/3.
 */
function route(handle,pathname,request,response,postData){
    if(typeof handle[pathname] === "function"){
        return handle[pathname](request,response,postData);
    }else{
        response.writeHead(404, {"Content-Type": "text/plain"});     
        response.write("404 Not found");     
        response.end();
    }
}
exports.route = route;