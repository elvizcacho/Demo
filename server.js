var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var Suppliers = require('./api/suppliers');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/', express.static(path.join(__dirname + '/client/main')));

app.post('/api/suppliers', Suppliers.createSupplier);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
