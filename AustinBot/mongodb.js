






var cors = require('cors');
var path = require('path');
var express = require('express');
var request = require('request');
var route = require('./Route/route');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3001;

//MONGO DB SETUP
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoDB,{useMongoClient: true});
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection_error:'));
db.on('connected',()=>{
  console.log('Connected to database mongodb @27017');
});
db.once('open', function(){
  console.log("DB connection alive");
});
app.use(express.static(path.join(__dirname,'public')));
app.use('/api',route);

app.listen(port,()=>{
  console.log("Listening port 3000");
});