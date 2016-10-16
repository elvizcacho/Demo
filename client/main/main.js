

var App = angular.module('App', []);

App.controller('HomeController', function($scope, $http) {
  
  $scope.supplier = {
    address: {},
    contactPerson: {},
    bankDetails: {},
    taxInfo: {}
  };
  
  $scope.sendForm = function (supplier) {
    console.log(supplier);
    $http.post('/api/suppliers', supplier).success(function(response) {
      console.log(response);
    });
  };
  
});
