/**
 * Created by Administrator on 2014/11/3.
 */
var fs = require('fs');
var jsp = require("./UglifyJS-master/uglify-js").parser;
var pro = require("./UglifyJS-master/uglify-js").uglify;
 
function jsMinifier(flieIn, fileOut) {
     var flieIn=Array.isArray(flieIn)? flieIn : [flieIn];
     var origCode,ast,finalCode='';
     for(var i=0; i<flieIn.length; i++) {
        origCode = fs.readFileSync(flieIn[i], 'utf8');
        ast = jsp.parse(origCode);
        ast = pro.ast_mangle(ast);
        ast= pro.ast_squeeze(ast);
        finalCode +=';'+ pro.gen_code(ast);
     }
    fs.writeFileSync(fileOut, finalCode, 'utf8');
}

jsMinifier(['./modules/init.js','./modules/index.js'], './modules/test-min.js'); //合并压缩