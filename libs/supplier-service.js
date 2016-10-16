var soap = require('soap');

var callback;

soap.createClient(__dirname + '/SupplierManageIn.wsdl', function(err, client) {
  client.setSecurity(new soap.BasicAuthSecurity('_SUPPLIER', 'EFSdemo12'));
  callback(client);
});

module.exports = function(cb) {
  callback = cb;
};
