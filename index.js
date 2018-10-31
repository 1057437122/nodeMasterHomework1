/*
 *
 * Author:libaishun
 * Email:libaishun007@gmail.com
 * 
 */

// dependies
var http = require('http');
var config = require('./config');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

var httpServer = http.createServer(function(req,res){
  unifiedHandler(req,res);
});

// start the server
httpServer.listen(config.httpPort,function(){
  console.log("now server listening on :",config.httpPort);
});

var unifiedHandler = function(req,res){
  // parse path
  var parsedUrl = url.parse(req.url,true);

  // trimed path
  var queryString = parsedUrl.query;

  var path = parsedUrl.pathname;

  var trimedPath = path.replace(/^\/+|\/+$/g,'');
  
  var method = req.method.toLowerCase();

  var headers = req.headers;
  
  var decoder = new StringDecoder('utf-8');

  var buff = '';

  req.on('data',function(data){
    buff += decoder.write(data);
  });

  req.on('end',function(){
    buff += decoder.end();
  });
  
  var chooseHandler = typeof(router[trimedPath]) != 'undefined' ? router[trimedPath]: handlers.notFound;

  var data={
    "path":path,
    "trimedPath":trimedPath,
    "headers":headers,
    "payload":buff
  }
  console.log("data",data);

  chooseHandler(data,function(statusCode,payload){
    statusCode = typeof(statusCode) == 'number' ? statusCode : 200;
    payload = typeof(payload) == 'object' ? payload : {}
    payloadString = JSON.stringify(payload);
    res.setHeader('Content-type','application/json');
    res.writeHead(statusCode);
    res.end(payloadString);
    console.log("response statusCode:",statusCode," and data:",payloadString);

  });

}
var handlers = {}
handlers.ping = function(data,callback){
  callback(200);
}
handlers.hello = function(data,callback){
  var payload = {"hello":"my first app"}
  callback(200,payload);
}
handlers.notFound = function(data,callback){
  callback(404);
}
var router = {
  'ping':handlers.ping,
  'hello':handlers.hello
}
