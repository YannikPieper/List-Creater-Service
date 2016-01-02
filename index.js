var express = require('express');
var app = express();
var server = app.listen(3000);

var bodyParser = require('body-parser');

var pg = require('pg');
var conString = 'postgres://localhost:5432/jonathan';

app.use(bodyParser.json());

app.post('/api/v1/search',echo,db_test,end);

function echo(req,res,next){
  console.dir(req.body);
  //var data = req.body;
  next();
}

function end(req,res){
  res.end;
}

function db_test(req,res,next){
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('TABLE list_creater_service',function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      //for(var i = 0;i <= result.rows.length;i++){
        console.log(result);
      //}
    });
  });
}
