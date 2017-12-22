var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var dbconnection = require('./api/data/db.js');
var routes = require('./api/router');

// dbconnection.openConn();
app.set('port',3000);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended : false }));

app.use('/api',routes);

var server = app.listen(app.get('port'), () => {
    var port  = server.address().port;
    console.log("Sever is listening on port " + port + "...");
});
