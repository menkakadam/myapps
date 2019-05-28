require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/emps', require('./controllers/emps.controller'));
app.use('/users', require('./controllers/users.controller'));

var port = process.env.PORT === 'production' ? 80 : 4000;
app.listen(process.env.PORT || 4000, function () {
    console.log('Server listening on port ' + port);
});
