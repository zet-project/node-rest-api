angular.module('ItemCtrl', ['ItemService']).controller('ItemController', ['$scope', '$rootScope', '$location', '$routeParams', 'Item', function($scope, $rootScope, $location, $routeParams, Item) {
  $scope.text = 'Click any item to edit it';
  $scope.items = [];
  $scope.item = {};
  // Edit item view
  if ($routeParams.item_id != undefined) {
    Item.get($routeParams.item_id).then(function(resp) {
      $scope.item = resp.data;
    });
  }
  // Get all items
  Item.all().then(function(resp) {
    $scope.items = resp.data;
  });
  // Add new item to database
  $scope.createNewItem = function() {
    
    Item.create(this.item).then(function() {
      $scope.item = {};
      $location.path('/items');
    });
  };
  
  $scope.removeItem = function(item_id) {
    Item.delete(item_id).then(function() {
      $scope.item = {};
      $location.path('/items');
    });
  };
  
  $scope.editItem = function(item_id) {
    
    Item.update(item_id, $scope.item).then(function() {
      $scope.item = {};
      $location.path('/items');
    });
  };
  
}]);