var express = require('express');
var app = express();
var server = app.listen(3000);

var bodyParser = require('body-parser');

var pg = require('pg');
var conString = 'postgres://localhost:5432/jonathan';

app.use(bodyParser.json());

app.post('/api/v1/search',query_creater,db_search,end);

function query_creater(req,res,next){
  console.dir(req.body);
  var query = 'SELECT id, name, size FROM list_creater_service WHERE';
  if(req.body.max_size){
    query = query + ' size <=' + req.body.max_size + ' AND';
  }
  if(req.body.min_size){
    query = query + ' size >=' + req.body.min_size + ' AND';
  }
  if(req.body.gamemode){
    query = query + ' ' + req.body.gamemode + ' = ANY(gamemode)' + ' AND';
  }
  if(req.body.country){
    query = query + ' country = '  + req.body.country + ' AND';
  }
  next(query.slice(0, -4));
}

function end(req,res){
  res.end;
}

function db_search(qry,req,res,next){
  //var a = 'SELECT id, name, size FROM list_creater_service WHERE size <=' + req.body.size.max + 'AND size >= ' + req.body.size.min + 'AND ' + req.body.gamemode + ' = ANY(gamemode) AND country = '  + req.body.country;
  console.log(qry);
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query(qry,function(err, result) {
      done();
      if(err) {
        return console.error('error running query', err);
      }
      for(var i = 0;i <= result.rows.length;i++){
        console.log(result.rows[i]);
      }
      res.json(result.rows)
    });
  });
  next();
}
