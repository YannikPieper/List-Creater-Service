var express = require('express');
var app = express();
var server = app.listen(3000);
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/api/v1/search',echo,end);

function saver(req,res,next){
  console.dir(req.body);
  var data = req.body;
  next();
}

function end(req,res){
  res.end;
}
